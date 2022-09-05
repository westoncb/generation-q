import React, { useEffect, useRef, useState } from "react"
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
    Divider,
} from "@mui/material"
import { getState } from "../store"
import DeleteIcon from "@mui/icons-material/Delete"
import isNil from "lodash.isnil"

export default function GenerationEditor({ gTask }) {
    const [canvasProps, setCanvasProps] = useState({
        className: "react-sketch-canvas",
        width: "100%",
        height: "500px",
        preserveBackgroundImageAspectRatio: "none",
        strokeWidth: 4,
        strokeColor: "#000000",
        canvasColor: "#d5e2de",
        style: { borderRight: "0" },
        exportWithBackgroundImage: true,
    })

    const [generatedArgs, setGeneratedArgs] = useState("")

    useEffect(() => {
        if (!isNil(gTask?.specialArgs)) {
            const argString = Object.entries(gTask.specialArgs).reduce(
                (
                    result: string,
                    [key, curArg]: [string, { enabled: boolean; param: string }]
                ) =>
                    result +
                    (curArg.enabled
                        ? `${curArg.param}${gTask[key]}` + " "
                        : ""),
                ""
            )
            setGeneratedArgs(argString)
        }
    }, [gTask])

    const updateGTask = (prop, val) => {
        getState().updateItem({ ...gTask, [prop]: val })
    }

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
                        {getArgCustomizer("prompt", gTask)}
                        <TextField
                            sx={{ mb: "2rem" }}
                            className="genq-basic-input"
                            multiline
                            rows={6}
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
                                    updateGTask("seed", Number(e.target.value))
                                }
                                value={gTask?.seed}
                            />
                        </div>

                        <TextField
                            sx={{ mb: "2rem" }}
                            className="genq-basic-input"
                            label="Command"
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
                            rows={4}
                            multiline
                            aria-label="args"
                            placeholder="enter additional args you'd like to pass in, e.g. `--iterations 42`"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            className="aux-value-display"
                            rows={4}
                            multiline
                            aria-label="auto-args"
                            value={generatedArgs}
                            placeholder="no generated args"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button
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

function getDimensionMarks(count, increment, base) {
    const marks = []
    for (let i = 0; i < count; i++) {
        const value = base + increment * i
        marks.push({ value, label: value })
    }

    return marks
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
