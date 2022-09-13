import { Button, IconButton } from "@mui/material"
import React, { useState, useRef } from "react"
import placeholder from "../../../assets/images/placeholders/00024.png"
import DeleteIcon from "@mui/icons-material/Delete"
import RefreshIcon from "@mui/icons-material/Refresh"
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings"
import DoneIcon from "@mui/icons-material/Done"
import { setState, getState } from "../store"
import DetailsDialog from "./DetailsDialog"

import GenerationTask from "@src/generationTask"

export default function CompletedGenerations({ gTasks }) {
    return (
        <div className="completed-generations">
            {gTasks.map(gTask => (
                <CompletedGTask key={gTask.id} gTask={gTask} />
            ))}
        </div>
    )
}

const iconSize = "2.5rem"
const LIMBO_COUNT_START = 3
const STEP_DURATION = 750 // make sure to keep in sync with .delete-limbo-count-anim

function CompletedGTask({ gTask }) {
    const [inDeleteLimbo, setInDeleteLimbo] = useState(false)
    const [deleteLimboCount, setDeleteLimboCount] = useState(LIMBO_COUNT_START)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)
    const countElementRef = useRef(null)
    const countIntervalId = useRef(null)

    const buttonWithTextStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "0.5rem",
    }

    // Will probably need to communicate with the Node process to load
    // the actual image using gTask.outputFile

    return (
        <div className="completed-gtask">
            <DetailsDialog
                onClose={() => setShowDetailsDialog(false)}
                gTask={gTask}
                show={showDetailsDialog}
            />
            <div
                className="delete-limbo"
                style={{ display: inDeleteLimbo ? "flex" : "none" }}
            >
                <div ref={countElementRef} className="delete-limbo-count">
                    {deleteLimboCount}
                </div>
                <div className="delete-limbo-prompt">
                    Are you sure you want to delete?
                </div>
                <Button
                    onClick={e => {
                        clearInterval(countIntervalId.current)
                        setInDeleteLimbo(false)
                    }}
                    sx={{ fontSize: "3rem" }}
                >
                    Cancel
                </Button>
            </div>
            <div className="completed-gtask-title">{gTask.id}</div>
            <div className="gtask-image-container">
                {gTask.outputFile === null && (
                    <div className="missing-output-msg">
                        Could not find generated image file!
                    </div>
                )}
                {/* Just always using placeholder for now, but should check
                for gTask.outputFile === null before using in the future */}
                <img src={placeholder} className="gtask-image" />
            </div>
            <div className="completed-gtask-prompt">{gTask.prompt}</div>
            <div className="completed-gtask-controls">
                <div style={buttonWithTextStyle}>
                    <IconButton
                        onClick={e => {
                            setInDeleteLimbo(true)

                            // We have a second local copy of this because the onClick closure
                            // will have only the initial value of deleteLimboCount across all
                            // executions of setInterval below; we need deleteLimboCount as part
                            // of the component state in order to render it visually, and we need
                            // the local copy so we know when to stop counting down.
                            let localLimboCount = LIMBO_COUNT_START
                            setDeleteLimboCount(LIMBO_COUNT_START)
                            countElementRef.current?.classList.add(
                                "delete-limbo-count-anim"
                            )
                            countIntervalId.current = setInterval(() => {
                                if (localLimboCount === 1) {
                                    setInDeleteLimbo(false)
                                    getState().removeCompletedTask(gTask.id)
                                    clearInterval(countIntervalId.current)
                                }

                                countElementRef.current?.classList.remove(
                                    "delete-limbo-count-anim"
                                )
                                // Maybe there's a better way to do this but I haven't found it.
                                // We access .offsetWidth here to trigger a reflow, which apparently
                                // is a sufficient condition for removing/re-adding a class to replay
                                // an animation, vs. the remove+add going unnoticed by browser
                                countElementRef.current?.offsetWidth
                                countElementRef.current?.classList.add(
                                    "delete-limbo-count-anim"
                                )
                                setDeleteLimboCount(count => count - 1)
                                localLimboCount--
                            }, STEP_DURATION)
                        }}
                    >
                        <DeleteIcon
                            sx={{ fontSize: iconSize, color: "#ff5555" }}
                        />
                    </IconButton>
                    Delete
                </div>
                <div style={buttonWithTextStyle}>
                    <IconButton
                        onClick={e => {
                            const t = new GenerationTask()
                            t.copy(gTask, true)
                            getState().addToQueue(t)
                        }}
                    >
                        <RefreshIcon
                            sx={{ fontSize: iconSize, color: "#8a97df" }}
                        />
                    </IconButton>
                    Re-run generation
                </div>
                <div style={buttonWithTextStyle}>
                    <IconButton onClick={e => setShowDetailsDialog(true)}>
                        <DisplaySettingsIcon
                            sx={{ fontSize: iconSize, color: "#8a97df" }}
                        />
                    </IconButton>
                    View details
                </div>
                <div style={buttonWithTextStyle}>
                    <IconButton
                        onClick={e => {
                            getState().removeCompletedTask(gTask.id)
                            // add to gallery
                            setState({
                                gallery: [...getState().gallery, gTask],
                            })
                        }}
                    >
                        <DoneIcon
                            sx={{ fontSize: iconSize, color: "#46d646" }}
                        />
                    </IconButton>
                    Keep
                </div>
            </div>
        </div>
    )
}
