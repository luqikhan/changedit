import {
  Home,
  FilePlus,
  FileText,
  User,
  Users,
  Calendar,
  Circle
} from "react-feather";

export default [
  {
    id: "agreementToComplete",
    title: "Agreements To Complete",
    icon: <Calendar size={20} />,
    navLink: "/agreements/pending"
  },
  {
    id: "previousAgreements",
    title: "Previous Agreements",
    icon: <FileText size={20} />,
    navLink: "/agreements/previous"
  },
  {
    id: "member/offers",
    title: "Member Offers",
    icon: <Users size={20} />,
    navLink: "/agreements/member/offers"
  }
];
