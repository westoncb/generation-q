import React, { useState, useRef, useMemo } from "react"
import shallow from "zustand/shallow"
import { useStore } from "../store"
import placeholder from "../../../assets/images/placeholders/00024.png"
import { TextField, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings"
import DetailsDialog from "./DetailsDialog"

export default function Gallery({}) {
    const { gallery } = useStore(state => ({ gallery: state.gallery }), shallow)
    const [filter, setFilter] = useState("")
    const [selectedItem, setSelectedItem] = useState(null)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    const filteredGallery = useMemo(() => {
        return gallery.filter(
            gTask =>
                gTask.prompt.toLowerCase().includes(filter.toLowerCase()) ||
                //TODO: Just checking id here for testing, this should be deleted
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
                    <SearchIcon sx={{ fontSize: "2rem", color: "#888" }} />
                    <TextField
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        size="small"
                        sx={{ width: "20rem", backgroundColor: "#f2f5f8" }}
                    />
                </div>
            </div>
            <div className="gallery-body">
                {filteredGallery.map(gTask => {
                    return (
                        <div
                            key={gTask.id}
                            className="gallery-item"
                            onClick={e => setSelectedItem(gTask)}
                        >
                            <img src={placeholder} className="gallery-image" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function FullView({ show, gTask, onClose, showDetailsFunc }) {
    return (
        <Dialog onClose={onClose} open={show}>
            <DialogTitle
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {gTask?.id}
                <IconButton
                    onClick={e => {
                        showDetailsFunc()
                    }}
                >
                    <DisplaySettingsIcon
                        sx={{ fontSize: "2.5rem", color: "#8a97df" }}
                    />
                </IconButton>
            </DialogTitle>
            <div className="full-view">
                <img className="full-view-img" src={placeholder}></img>
            </div>
        </Dialog>
    )
}
