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
    id: "account",
    title: "Account",
    icon: <User size={20} />,
    navLink: "/account"
  },
  {
    header: "Agreements & Offers"
  },
  {
    id: "createAgreement",
    title: "Create Agreement",
    icon: <FilePlus size={20} />,
    children: [
      {
        id: "sellerAgreement",
        title: "Seller",
        icon: <Circle size={12} />,
        navLink: "/agreements/seller"
      },
      {
        id: "buyerAgreement",
        title: "Buyer",
        icon: <Circle size={12} />,
        navLink: "/agreements/buyer"
      }
    ]
  },
  {
    id: "agreementToComplete",
    title: "Pending Agreement",
    icon: <Calendar size={20} />,
    navLink: "/agreements/pending"
  },
  {
    id: "previousAgreements",
    title: "Previous Agreement",
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
