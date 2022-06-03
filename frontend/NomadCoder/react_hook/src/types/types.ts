import React, { EventHandler } from "react"

export interface Content {
    tab: string
    content: string
}

export type OnMouseEvent = (event: MouseEvent) => void
