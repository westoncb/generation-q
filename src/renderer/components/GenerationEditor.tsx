import React, { useEffect, useState } from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"
import { InputLabel, TextField, Slider, Box, Button } from "@mui/material"
import { getState } from "../store"
import DeleteIcon from "@mui/icons-material/Delete"

export default function GenerationEditor({ gTask }) {
    const [canvasProps, setCanvasProps] = useState({
        className: "react-sketch-canvas",
        width: "100%",
        height: "500px",
        preserveBackgroundImageAspectRatio: "none",
        strokeWidth: 4,
        eraserWidth: 5,
        strokeColor: "#000000",
        canvasColor: "#d5e2de",
        style: { borderRight: "1px solid #CCC" },
        svgStyle: {},
        exportWithBackgroundImage: true,
        withTimestamp: true,
        allowOnlyPointerType: "all",
    })

    if (gTask === null) {
        return getPlaceholder()
    } else {
        return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    padding: "1rem",
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "stretch",
                }}
            >
                <div
                    style={{
                        paddingRight: "1rem",
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "stretch",
                        }}
                    >
                        <TextField
                            sx={{ mb: "1rem" }}
                            className="genq-basic-input"
                            label="Prompt"
                            multiline
                            rows={5}
                            aria-label="prompt"
                            placeholder="what would you like to generate?"
                            variant="outlined"
                            value={gTask.prompt}
                            onChange={e => {
                                getState().updateItem({
                                    ...gTask,
                                    prompt: e.target.value,
                                })
                            }}
                        />
                        <TextField
                            sx={{ mb: "1rem" }}
                            className="genq-basic-input"
                            label="Command"
                            aria-label="command"
                            placeholder="enter command to execute, e.g. `python ~/sd/scripts/dream.py`"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            className="genq-basic-input"
                            label="Args"
                            aria-label="args"
                            placeholder="enter additional args you'd like to pass in, e.g. `--seed 42`"
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button
                            sx={{ ml: "1rem" }}
                            endIcon={<DeleteIcon />}
                            variant="outlined"
                            onClick={e => {
                                getState().removeFromQueue(gTask.id)
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <div style={{ flexGrow: "1" }}>
                    <InputLabel>Initialization image</InputLabel>
                    <div
                        style={{
                            border: "1px dashed gray",
                            borderRadius: "5px",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <ReactSketchCanvas
                            width="600"
                            height="400"
                            {...canvasProps}
                        />
                    </div>
                    <input
                        type="color"
                        value={canvasProps.strokeColor}
                        onChange={e =>
                            setCanvasProps({
                                ...canvasProps,
                                strokeColor: e.target.value,
                            })
                        }
                    ></input>
                    <input
                        type="color"
                        value={canvasProps.canvasColor}
                        onChange={e =>
                            setCanvasProps({
                                ...canvasProps,
                                canvasColor: e.target.value,
                            })
                        }
                    ></input>
                    <Slider
                        sx={{ display: "inline-block" }}
                        aria-label="Volume"
                        value={canvasProps.strokeWidth}
                        defaultValue={4}
                        min={1}
                        max={42}
                        onChange={(even, newValue) =>
                            setCanvasProps({
                                ...canvasProps,
                                strokeWidth: newValue as number,
                            })
                        }
                    />
                </div>
            </Box>
        )
    }
}

function getPlaceholder() {
    const message =
        getState().queue?.length === 0
            ? `Click "New Generation" to begin.`
            : `No generation task selected.`

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#f2f5f8",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                }}
            >
                <h2 style={{ color: "#aaa" }}>{message}</h2>
            </div>
        </div>
    )
}
