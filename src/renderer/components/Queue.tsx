import React, { useState } from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { Box } from "@mui/material"

import { reorder } from "../../utils/helpers"
import QueueItem from "./QueueItem"
import GenerationTask from "@src/generationTask"
import { setState } from "../store"

type QueueProps = { items: GenerationTask[] }

export default function Queue({ items }: QueueProps) {
    const onDragEnd = ({ destination, source }: DropResult) => {
        // dropped outside the list
        if (!destination) return

        const newItems = reorder(items, source.index, destination.index)

        console.log(newItems)
        // Create a new array here!
        const newItemSequence = newItems.map((el, index) => ({
            ...el,
        }))

        setState({ queue: newItemSequence })
    }
    return (
        <Box className="queue-wrapper">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-list">
                    {provided => (
                        <div
                            className="queue"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {items.map((item, index) => (
                                <QueueItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}
