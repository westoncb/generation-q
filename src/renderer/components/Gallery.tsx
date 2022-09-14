import React, { useState, useRef, useMemo, useEffect } from "react"
import shallow from "zustand/shallow"
import { useStore } from "../store"
import placeholder1 from "../../../assets/images/placeholders/00024.png"
import placeholder2 from "../../../assets/images/placeholders/00016.png"
import placeholder3 from "../../../assets/images/placeholders/00036.png"
import placeholder4 from "../../../assets/images/placeholders/00048.png"
import placeholder5 from "../../../assets/images/placeholders/00049.png"
import placeholder6 from "../../../assets/images/placeholders/00009.png"
import placeholder7 from "../../../assets/images/placeholders/00051.png"
import { TextField, IconButton } from "@mui/material"
import {
    Search,
    Fullscreen,
    Close,
    Delete,
    Refresh,
    ArrowBack,
    ArrowForward,
    DisplaySettings,
} from "@mui/icons-material"

import DetailsDialog from "./DetailsDialog"

const placeholders = [
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
    placeholder5,
    placeholder6,
    placeholder7,
]

function random(seed) {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
}

function randPlaceholder(index) {
    return placeholders[Math.floor(random(index) * placeholders.length)]
}

export default function Gallery({}) {
    const { gallery } = useStore(state => ({ gallery: state.gallery }), shallow)
    const [filter, setFilter] = useState("")
    const [selectedItem, setSelectedItem] = useState(null)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    const filteredGallery = useMemo(() => {
        return gallery.filter(
            gTask =>
                gTask.prompt.toLowerCase().includes(filter.toLowerCase()) ||
                //TODO: Just checking id here so filtering can be tested, this should be deleted
                gTask.id.toLowerCase().includes(filter.toLowerCase())
        )
    }, [filter])

    return (
        <div className="gallery">
            <FullView
                show={selectedItem !== null}
                gTask={selectedItem}
                onClose={() => setSelectedItem(null)}
                showDetailsFunc={() => setShowDetailsDialog(true)}
                nextImg={() =>
                    setSelectedItem(
                        selectedItem =>
                            filteredGallery[
                                (filteredGallery.indexOf(selectedItem) + 1) %
                                    filteredGallery.length
                            ]
                    )
                }
                prevImg={() =>
                    setSelectedItem(
                        selectedItem =>
                            filteredGallery[
                                Math.max(
                                    0,
                                    filteredGallery.indexOf(selectedItem) - 1
                                )
                            ]
                    )
                }
            />
            {selectedItem !== null && (
                <DetailsDialog
                    gTask={selectedItem}
                    show={showDetailsDialog}
                    onClose={() => setShowDetailsDialog(false)}
                />
            )}
            <div className="gallery-header">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Search sx={{ fontSize: "2rem", color: "#888" }} />
                    <TextField
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        size="small"
                        sx={{ width: "20rem", backgroundColor: "#f2f5f8" }}
                    />
                </div>
            </div>
            <div className="gallery-body">
                {filteredGallery.map((gTask, i) => {
                    // @ts-ignore: this is a hack for demoing; need index to select
                    // a random placeholder
                    gTask.index = i

                    return (
                        <div
                            key={gTask.id}
                            data-id={gTask.id}
                            className="gallery-item"
                            onClick={e => {
                                setSelectedItem(gTask)
                            }}
                        >
                            <img
                                src={randPlaceholder(i)}
                                className="gallery-image"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function toggleFullscreen(elem) {
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
            )
        })
    } else {
        document.exitFullscreen()
    }
}

function isInFullscreen() {
    return document.fullscreenElement !== null
}

const fullViewIconSize = "2.5rem"
function FullView({ show, gTask, onClose, showDetailsFunc, nextImg, prevImg }) {
    // We need to track there here instead of just using isInFullscreen() in order
    // to trigger re-renders when it changes
    const [inFSMode, setInFSMode] = useState(false)
    const fullViewEleRef = useRef(null)

    useEffect(() => {
        fullViewEleRef.current?.focus()
    }, [fullViewEleRef.current, show])

    // Handle fullscreen change event
    useEffect(() => {
        const func = e => {
            // NOTE: This doesn't actually work right now! fullscreenchange event never fires
            setInFSMode(isInFullscreen())
        }
        fullViewEleRef.current?.addEventListener("fullscreenchange", func)
        return fullViewEleRef.current?.removeEventListener(
            "fullscreenchange",
            func
        )
    }, [fullViewEleRef.current])

    return (
        <div
            ref={fullViewEleRef}
            className="full-view"
            tabIndex={-1}
            style={{
                display: show ? "flex" : "none",
            }}
            onKeyDown={e => {
                if (e.key === "ArrowLeft") {
                    prevImg()
                } else if (e.key === "ArrowRight") {
                    nextImg()
                } else if (e.key === "Escape") {
                    if (inFSMode) {
                        setInFSMode(false)
                    }
                    onClose()
                }
            }}
        >
            <div className="full-view-header">
                <IconButton
                    onClick={e => {
                        setInFSMode(inFSMode => !inFSMode)
                        toggleFullscreen(fullViewEleRef.current)
                    }}
                >
                    <Fullscreen
                        sx={{ fontSize: fullViewIconSize, color: "white" }}
                    />
                </IconButton>
                <IconButton
                    onClick={e => {
                        if (inFSMode) {
                            // This should not be necessary but because the fullscreenchange
                            // even isn't working we have to recourse to it
                            if (isInFullscreen()) {
                                toggleFullscreen(fullViewEleRef.current)
                            }
                            setInFSMode(false)
                        }
                        onClose()
                    }}
                >
                    <Close
                        sx={{ fontSize: fullViewIconSize, color: "white" }}
                    />
                </IconButton>
            </div>
            <div className="full-view-body">
                <button className="change-image-btn" onClick={e => prevImg()}>
                    <ArrowBack sx={{ fontSize: fullViewIconSize }} />
                </button>
                <div className="full-view-img-container">
                    <img
                        className="full-view-img"
                        src={randPlaceholder(gTask?.index ?? 0)}
                    ></img>
                </div>
                <button className="change-image-btn" onClick={e => nextImg()}>
                    <ArrowForward sx={{ fontSize: fullViewIconSize }} />
                </button>
            </div>
            <div className="full-view-prompt">{gTask?.prompt}</div>
            {/* Disabling this check because inFSMode is innacurate right now, so if user
            exits fullscreen by pressing Escape, inFSMode will still be false */}
            {(!inFSMode || true) && (
                <div className="full-view-footer">
                    <IconButton
                        onClick={e => {
                            showDetailsFunc()
                        }}
                    >
                        <Delete
                            sx={{
                                fontSize: fullViewIconSize,
                                color: "#ff5555",
                            }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={e => {
                            showDetailsFunc()
                        }}
                    >
                        <Refresh
                            sx={{
                                fontSize: fullViewIconSize,
                                color: "#8a97df",
                            }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={e => {
                            showDetailsFunc()
                        }}
                    >
                        <DisplaySettings
                            sx={{
                                fontSize: fullViewIconSize,
                                color: "#8a97df",
                            }}
                        />
                    </IconButton>
                </div>
            )}
        </div>
    )
}
