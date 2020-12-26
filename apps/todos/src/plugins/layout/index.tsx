import { PluginCollection } from "@webiny/plugins/types";

// Layout plugin
import AppBar from './AppBar';
import Content from './Content';

// AppBar plugins
import Logo from "./Logo";
import Dashboard from "./Dashboard";
import Notification from "./Notification";

export default (): PluginCollection => [
  // Layout plugins
  AppBar,
  Content,
  // AppBar plugins
  Logo,
  Dashboard,
  Notification
];
