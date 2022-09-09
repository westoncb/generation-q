import React, { useRef, useState } from "react"
import { useStore } from "../store"
import shallow from "zustand/shallow"
import isNil from "lodash.isnil"
import { Checkbox, InputLabel } from "@mui/material"

export default function Terminal({ gTask }) {
    const { terminalOutputs } = useStore(
        state => ({ terminalOutputs: state.terminalOutputs }),
        shallow
    )

    const [scrollToBottom, setScrollToBottom] = useState(true)

    const textAreaRef = useRef(null)

    if (scrollToBottom && !isNil(textAreaRef.current)) {
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
    }

    return (
        <div className="terminal">
            <div className="terminal-header">
                <span>termainal output</span>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <InputLabel sx={{ color: "white " }}>
                        Auto-scroll
                    </InputLabel>
                    <Checkbox
                        sx={{ color: "white" }}
                        onChange={(event, val) => setScrollToBottom(val)}
                        checked={scrollToBottom}
                    />
                </div>
            </div>
            <textarea
                ref={textAreaRef}
                spellCheck={false}
                className="terminal-text"
                value={terminalOutputs[gTask.id]}
            ></textarea>
        </div>
    )
}
