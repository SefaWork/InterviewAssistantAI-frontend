import { useState } from "react"

type CollapsibleDivProps = {
    title: string,
    children: React.ReactNode,
    width?: string | number,
    startCollapsed?: boolean,
    headerClassName?: string,
    containerClassName?: string,
}

function CollapsibleDiv({startCollapsed=false, headerClassName = "collapsible-div-header", containerClassName = "collapsible-div-container", title, width, children}: CollapsibleDivProps) {
    const [collapsed, setCollapsed] = useState<boolean>(startCollapsed);

    return (
        <>
            <h2 
                style={{
                    cursor:"pointer"
                }}
                className={headerClassName} 
                onClick={() => setCollapsed(!collapsed)}
            >
                <u>{title}</u> {collapsed? "▲" : "▼"}</h2>
            <div className={containerClassName} style={{
                maxHeight: collapsed ? "0" : "1000px",
                overflow: "hidden",
                transition: "max-height 300ms ease-in-out",
                width
            }}>
                {children}
            </div>
        </>
    )
}

export default CollapsibleDiv