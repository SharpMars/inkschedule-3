// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayMenu, SystemTraySubmenu};
use tauri_plugin_autostart::ManagerExt;
use tauri_plugin_positioner::{Position, WindowExt};

fn main() {
    let version_item = CustomMenuItem::new("version".to_string(), "").disabled();
    let github_item = CustomMenuItem::new("github".to_string(), "GitHub");
    let autostart_item = CustomMenuItem::new("autostart".to_string(), "Launch on startup");
    let quit_item = CustomMenuItem::new("quit".to_string(), "Quit");

    let tab_default = CustomMenuItem::new("tab_default", "Default");
    let tab_salmon = CustomMenuItem::new("tab_salmon", "Salmon Run");

    let default_tab_submenu = SystemTrayMenu::new()
        .add_item(tab_default)
        .add_item(tab_salmon);

    let default_tab_item = SystemTraySubmenu::new("Default tab", default_tab_submenu);

    let system_tray_menu = SystemTrayMenu::new()
        .add_item(version_item)
        .add_item(github_item)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_submenu(default_tab_item)
        .add_item(autostart_item)
        .add_item(quit_item);
    let system_tray = SystemTray::new()
        .with_menu(system_tray_menu)
        .with_tooltip("InkSchedule 3");

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                tauri::SystemTrayEvent::LeftClick { .. } => {
                    let window = app.get_window("main").unwrap();
                    let _ = window.move_window(Position::TrayCenter);
                    let mut position = window.outer_position().unwrap();

                    let window_width: i32 = window.outer_size().unwrap().width.try_into().unwrap();

                    let top_right_pos = position.x + window_width;
                    let monitor_size_width: i32 = window
                        .current_monitor()
                        .unwrap()
                        .unwrap()
                        .size()
                        .width
                        .try_into()
                        .unwrap();

                    if top_right_pos > monitor_size_width {
                        let pos_offset = top_right_pos - monitor_size_width;
                        position.x = position.x - pos_offset;
                        window.set_position(position).unwrap();
                    }

                    if !window.is_visible().unwrap() {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                tauri::SystemTrayEvent::MenuItemClick { id, .. } => {
                    if id == "github" {
                        app.shell_scope()
                            .open("https://github.com/SharpMars/inkschedule-3", None)
                            .unwrap();
                    }

                    if id == "autostart" {
                        let enabled = app.autolaunch().is_enabled().unwrap();
                        let toggle = app.tray_handle().get_item("autostart");
                        if !enabled {
                            app.autolaunch().enable().unwrap();
                            toggle.set_selected(true).unwrap();
                        } else {
                            app.autolaunch().disable().unwrap();
                            toggle.set_selected(false).unwrap();
                        }
                    }

                    if id == "tab_default" {
                        app.tray_handle()
                            .get_item("tab_default")
                            .set_selected(true)
                            .unwrap();
                        app.tray_handle()
                            .get_item("tab_salmon")
                            .set_selected(false)
                            .unwrap();
                        app.emit_all("set_tab", 0).unwrap();
                    }

                    if id == "tab_salmon" {
                        app.tray_handle()
                            .get_item("tab_salmon")
                            .set_selected(true)
                            .unwrap();
                        app.tray_handle()
                            .get_item("tab_default")
                            .set_selected(false)
                            .unwrap();
                        app.emit_all("set_tab", 1).unwrap();
                    }

                    if id == "quit" {
                        app.exit(0);
                    }
                }
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .setup(|app| {
            app.tray_handle()
                .get_item("autostart")
                .set_selected(app.autolaunch().is_enabled().unwrap())
                .unwrap();
            app.tray_handle()
                .get_item("version")
                .set_title("Version: ".to_owned() + &app.config().package.version.clone().unwrap())
                .unwrap();

            let app_handle = app.app_handle();

            app.listen_global("send_tab", move |event| {
                if let Some(payload) = event.payload() {
                    if let Ok(tab_id) = payload.parse::<u8>() {
                        match tab_id {
                            0 => {
                                app_handle
                                    .tray_handle()
                                    .get_item("tab_default")
                                    .set_selected(true)
                                    .unwrap();
                                app_handle
                                    .tray_handle()
                                    .get_item("tab_salmon")
                                    .set_selected(false)
                                    .unwrap();
                            }
                            1 => {
                                app_handle
                                    .tray_handle()
                                    .get_item("tab_salmon")
                                    .set_selected(true)
                                    .unwrap();
                                app_handle
                                    .tray_handle()
                                    .get_item("tab_default")
                                    .set_selected(false)
                                    .unwrap();
                            }
                            _ => (),
                        }
                    }
                }
            });

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::Updater(event) => match event {
                tauri::UpdaterEvent::Updated => {
                    _ = _app_handle.emit_all("reset", {});
                }
                _ => (),
            },
            _ => (),
        });
}
