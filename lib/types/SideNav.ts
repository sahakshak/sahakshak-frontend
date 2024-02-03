interface SubMenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface SideNav {
  title: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

export default SideNav;
