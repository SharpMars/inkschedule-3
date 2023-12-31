// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayMenu};
use tauri_plugin_autostart::ManagerExt;
use tauri_plugin_positioner::{Position, WindowExt};

fn main() {
    let version_item = CustomMenuItem::new("version".to_string(), "").disabled();
    let github_item = CustomMenuItem::new("github".to_string(), "GitHub");
    let autostart_item = CustomMenuItem::new("autostart".to_string(), "Launch on startup");
    let quit_item = CustomMenuItem::new("quit".to_string(), "Quit");
    let system_tray_menu = SystemTrayMenu::new()
        .add_item(version_item)
        .add_item(github_item)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(autostart_item)
        .add_item(quit_item);
    let system_tray = SystemTray::new().with_menu(system_tray_menu);

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
                    let top_right_pos = position.x + 450;
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
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
