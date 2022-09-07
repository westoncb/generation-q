import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"
import {
    InputLabel,
    TextField,
    Slider,
    Box,
    Button,
    Checkbox,
    Switch,
    FormControl,
} from "@mui/material"
import { getState } from "../store"
import DeleteIcon from "@mui/icons-material/Delete"
import isNil from "lodash.isnil"
import { DoneOutline, FmdBad } from "@mui/icons-material"

export default function GenerationEditor({ gTask }) {
    const [canvasProps, setCanvasProps] = useState({
        className: "react-sketch-canvas",
        width: "100%",
        height: "500px",
        preserveBackgroundImageAspectRatio: "none",
        backgroundImage: "",
        strokeWidth: 16,
        strokeColor: "#000000",
        canvasColor: "#f4ebd7",
        style: { borderRight: "0" },
        exportWithBackgroundImage: true,
    })

    const [generatedArgs, setGeneratedArgs] = useState("")
    const [draggingOnCanvas, setDraggingOnCanvas] = useState(false)
    const canvasRef = useRef(null)

    useEffect(() => {
        // Compute and store generated args
        if (!isNil(gTask?.specialArgs)) {
            setGeneratedArgs(gTask.getGeneratedArgs())
        }

        canvasProps.backgroundImage = gTask?.canvasData.bgImgObjUrl ?? ""
    }, [gTask])

    useLayoutEffect(() => {
        if (!isNil(canvasRef.current)) {
            canvasRef.current.clearCanvas()

            // Restore path data (would be lost during component unmount)
            if (!isNil(gTask.canvasData.paths)) {
                canvasRef.current.loadPaths(gTask.canvasData.paths)
            }
        }

        // For some reason the canvas ref (from ReactSketchCanvas) changes
        // every time a stroke is complete, so this gets called a lot.
    }, [canvasRef.current])

    const updateGTask = (prop, val) => {
        getState().updateItem({ ...gTask, [prop]: val })
    }

    if (gTask === null) {
        return getPlaceholder()
    } else {
        return (
            <div className="generation-editor">
                <div className="editor-header">
                    <div>
                        {gTask?.ready ? (
                            <DoneOutline
                                sx={{ fontSize: "4rem", ml: "1rem" }}
                                className="big-icon"
                            />
                        ) : (
                            <FmdBad
                                sx={{ fontSize: "4rem" }}
                                className="big-icon"
                            />
                        )}
                        <div
                            style={{
                                display: "inline-flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                            }}
                        >
                            {gTask?.ready ? "Ready." : "Not ready yet."}
                        </div>
                    </div>
                    <h4>{"id: " + gTask?.id}</h4>
                </div>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        padding: "1rem",
                        pt: "0",
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
                            {getArgCustomizer("prompt", gTask)}
                            <TextField
                                sx={{ mb: "2rem" }}
                                className="genq-basic-input"
                                multiline
                                rows={4}
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

                            {getArgCustomizer("width", gTask)}
                            <FormControl
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mb: "1rem",
                                }}
                            >
                                <span
                                    style={{ marginRight: "1rem" }}
                                    className="aux-value-display"
                                >
                                    {gTask.width}
                                </span>
                                <Slider
                                    min={256}
                                    max={1024}
                                    step={64}
                                    value={gTask.width}
                                    onChange={(e, val) =>
                                        updateGTask("width", val as number)
                                    }
                                    marks
                                    valueLabelDisplay="auto"
                                    sx={{
                                        display: "inline-block",
                                        ml: "0.5rem",
                                        flexGrow: 1,
                                    }}
                                />
                            </FormControl>

                            {getArgCustomizer("height", gTask)}
                            <FormControl
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mb: "1rem",
                                }}
                            >
                                <span
                                    style={{ marginRight: "1rem" }}
                                    className="aux-value-display"
                                >
                                    {gTask.height}
                                </span>
                                <Slider
                                    min={256}
                                    max={1024}
                                    step={64}
                                    value={gTask.height}
                                    onChange={(e, val) =>
                                        updateGTask("height", val as number)
                                    }
                                    marks
                                    valueLabelDisplay="auto"
                                    sx={{
                                        display: "inline-block",
                                        ml: "0.5rem",
                                        flexGrow: 1,
                                    }}
                                />
                            </FormControl>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: "2rem",
                                }}
                            >
                                {getArgCustomizer("seed", gTask)}
                                <TextField
                                    sx={{ ml: "1rem" }}
                                    inputProps={{
                                        style: {
                                            padding: "0.5rem",
                                        },
                                    }}
                                    className="genq-basic-input"
                                    onChange={e =>
                                        updateGTask(
                                            "seed",
                                            Number(e.target.value)
                                        )
                                    }
                                    value={gTask?.seed}
                                />
                            </div>

                            <TextField
                                sx={{ mb: "2rem" }}
                                className="genq-basic-input"
                                label="Command"
                                spellCheck={false}
                                rows={2}
                                multiline
                                aria-label="command"
                                placeholder="enter command to execute, e.g. `python ~/sd/scripts/dream.py`"
                                defaultValue=""
                                variant="outlined"
                            />
                            <TextField
                                className="genq-basic-input"
                                label="Custom args"
                                spellCheck={false}
                                rows={3}
                                multiline
                                aria-label="args"
                                placeholder="enter additional args you'd like to pass in, e.g. `--iterations 42`"
                                defaultValue=""
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                className="aux-value-display"
                                rows={3}
                                multiline
                                aria-label="auto-args"
                                value={generatedArgs}
                                placeholder="no generated args"
                                variant="outlined"
                            />
                        </div>
                        <div className="editor-footer">
                            <div
                                className="ready-container"
                                style={{
                                    backgroundColor: gTask.ready
                                        ? "#94e4a8"
                                        : "#ece572",
                                }}
                            >
                                <span className="ready-text">Ready?</span>
                                <Switch
                                    checked={gTask.ready}
                                    onChange={(e, val) =>
                                        updateGTask("ready", val)
                                    }
                                    color="primary"
                                />
                            </div>
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
                        {getArgCustomizer(
                            "initImage",
                            gTask,
                            "Initialization image"
                        )}
                        <div
                            style={{
                                border: "1px dashed gray",
                                borderRadius: "5px",
                                marginBottom: "0.5rem",
                            }}
                            className={draggingOnCanvas ? "file-hover" : ""}
                            tabIndex={0}
                            onDragOver={e => {
                                e.preventDefault()
                            }}
                            onDragEnter={e => {
                                setDraggingOnCanvas(true)
                            }}
                            onDragLeave={e => {
                                setDraggingOnCanvas(false)
                            }}
                            onDrop={ev => {
                                ev.preventDefault()
                                setDraggingOnCanvas(false)

                                if (ev.dataTransfer.items) {
                                    // Use DataTransferItemList interface to access the file(s)
                                    ;[...ev.dataTransfer.items].forEach(
                                        (item, i) => {
                                            // If dropped items aren't files, reject them
                                            if (item.kind === "file") {
                                                const file = item.getAsFile()
                                                const bgImgObjUrl =
                                                    URL.createObjectURL(file)
                                                updateGTask("canvasData", {
                                                    ...gTask.canvasData,
                                                    bgImgObjUrl,
                                                })
                                                setCanvasProps({
                                                    ...canvasProps,
                                                    backgroundImage:
                                                        bgImgObjUrl,
                                                })
                                            }
                                        }
                                    )
                                }
                            }}
                        >
                            <ReactSketchCanvas
                                ref={canvasRef}
                                onStroke={e =>
                                    canvasRef?.current
                                        ?.exportPaths()
                                        .then(paths => {
                                            updateGTask("canvasData", {
                                                ...gTask.canvasData,
                                                paths,
                                            })
                                        })
                                }
                                width="600"
                                height="400"
                                {...canvasProps}
                            />
                        </div>
                        <div className="paint-controls">
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
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                    marginLeft: "1rem",
                                }}
                            >
                                <Slider
                                    sx={{ display: "inline-block" }}
                                    aria-label="stroke-width"
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
                                <InputLabel>
                                    Stroke width: {canvasProps.strokeWidth}
                                </InputLabel>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "stretch",
                                flexGrow: 1,
                                marginTop: "1rem",
                            }}
                        >
                            <TextField
                                inputProps={{
                                    style: {
                                        padding: "0.5rem",
                                    },
                                }}
                                sx={{ flexGrow: 1, pr: "1rem" }}
                                size="small"
                                label="Export path"
                                value={gTask.initImgExportPath}
                                spellCheck={false}
                                onChange={e =>
                                    updateGTask(
                                        "initImgExportPath",
                                        e.target.value
                                    )
                                }
                            />
                            <Button
                                className="primary-button"
                                variant="contained"
                            >
                                Export init image
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        )
    }
}

function getArgCustomizer(paramName, gTask, label?: string) {
    if (isNil(label)) {
        label = paramName.charAt(0).toUpperCase() + paramName.slice(1)
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <InputLabel sx={{ flexShrink: 0 }}>{label}</InputLabel>
            <Checkbox
                checked={gTask.specialArgs[paramName].enabled}
                onChange={(e, val) => {
                    getState().updateItem({
                        ...gTask,
                        specialArgs: {
                            ...gTask.specialArgs,
                            [paramName]: {
                                ...gTask.specialArgs[paramName],
                                enabled: val,
                            },
                        },
                    })
                }}
                color="default"
            />
            <TextField
                inputProps={{
                    style: {
                        padding: "0.25rem",
                    },
                }}
                size="small"
                value={gTask?.specialArgs[paramName].param}
                onChange={e =>
                    getState().updateItem({
                        ...gTask,
                        specialArgs: {
                            ...gTask.specialArgs,
                            [paramName]: {
                                ...gTask.specialArgs[paramName],
                                param: e.target.value,
                            },
                        },
                    })
                }
            />
        </div>
    )
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
