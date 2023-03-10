import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/auth";
import Permission from "./Permission";
import { PERMISSION } from "../constant/permission";
const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isActive = selected === to;
  return (
    <MenuItem
      active={isActive}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        to && setSelected(to);
        onClick?.();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const [selected, setSelected] = useState("/" + location.pathname.split("/")[1]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} iconshape="square">
        <Menu style={{ flex: 1, overflow: "auto" }}>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  NOVELS
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* User */}
          {!isCollapsed && (
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%", background: "#fff" }}
                  src={user.image || require("../utils/img/img.jpg")}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" sx={{ m: "10px 0 0 0" }} color={colors.grey[100]} fontWeight="bold">
                  {user.username}
                </Typography>
                <Typography variant="h5" sx={{ m: "10px 0 0 0" }} color={colors.greenAccent[500]}>
                  {user.role.name}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Item */}
          <Box>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Permission
              permissions={[PERMISSION.READ_NOVELS, PERMISSION.WRITE_NOVELS, PERMISSION.EXECUTE_NOVELS, PERMISSION.ALL]}
            >
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                Novel
              </Typography>
              <Item
                title="List Novels"
                to="/story"
                icon={<MenuBookOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Permission>
            <Permission permissions={[PERMISSION.READ_USERS, PERMISSION.ACTIVE_USERS, PERMISSION.ALL]}>
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                User
              </Typography>
              <Item
                title="User"
                to="/user"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Permission>
            <Permission permissions={[PERMISSION.ALL]}>
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                Role
              </Typography>
              <Item title="Role" to="/role" icon={<KeyOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </Permission>
          </Box>
        </Menu>
        <Menu>
          <Box style={{ mb: "0px" }} marginBottom="0">
            <Item
              title="Log out"
              onClick={handleLogout}
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
