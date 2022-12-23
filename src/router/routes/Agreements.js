// ** React Imports
import { lazy } from "react";

const AgreementRoutes = [
  {
    path: "/agreements/seller",
    exact: true,
    component: lazy(() => import("../../views/agreements/SellerAgreement"))
  },
  {
    path: "/agreements/buyer",
    exact: true,
    component: lazy(() => import("../../views/agreements/BuyerAgreement"))
  },
  {
    path: "/agreements/preview/:id",
    exact: true,
    component: lazy(() => import("../../views/agreements/preview")),
    meta: {
      navLink: "/agreements"
    }
  },
  {
    path: "/agreements/previous",
    exact: true,
    component: lazy(() => import("../../views/agreements/previous/list"))
  },
  {
    path: "/agreements/pending",
    exact: true,
    component: lazy(() => import("../../views/agreements/pending"))
  },
  {
    path: "/agreements/member/offers",
    exact: true,
    component: lazy(() => import("../../views/agreements/MemberOffer"))
  }
];

export default AgreementRoutes;
