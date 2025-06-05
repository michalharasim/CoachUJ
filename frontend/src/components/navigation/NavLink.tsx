import {clsx} from "clsx";
import {NavLink as RouterNavLink } from "react-router-dom";
import React from "react";

type Props = {
    linkText: string,
    linkUrl: string,
    Svg: React.ElementType,
}
const NavLink = ({linkText, linkUrl, Svg} : Props) => {
    return (
        <RouterNavLink
            className={({ isActive }) =>
                clsx(
                    "flex flex-row hover:text-primary font-semibold items-center justify-start gap-3 text-xl",
                    {
                        "text-primary font-semibold": isActive
                    }
                )
            }
            to={linkUrl}
            end={linkUrl === "/" || linkUrl.startsWith("/#") ? true : undefined}
        >
            <Svg />
            <span>{linkText}</span>
        </RouterNavLink>
    )
}

export default NavLink;