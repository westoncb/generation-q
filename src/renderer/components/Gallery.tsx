import React, { useState, useRef, useMemo } from "react"
import shallow from "zustand/shallow"
import { useStore } from "../store"
import placeholder from "../../../assets/images/placeholders/00024.png"
import { TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export default function Gallery({}) {
    const { gallery } = useStore(state => ({ gallery: state.gallery }), shallow)
    const [filter, setFilter] = useState("")
    const filteredGallery = useMemo(() => {
        return gallery.filter(gTask =>
            gTask.prompt.toLowerCase().includes(filter.toLowerCase())
        )
    }, [filter])

    return (
        <div className="gallery">
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
                        <div key={gTask.id} className="gallery-item">
                            <img src={placeholder} className="gallery-image" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
