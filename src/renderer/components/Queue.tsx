import React, { useState } from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { Box } from "@mui/material"

import { reorder } from "../../utils/helpers"
import QueueItem from "./QueueItem"
import GenerationTask, { GTaskStatus } from "@src/generationTask"
import { setState } from "../store"
import { TransitionGroup } from "react-transition-group"
import { CSSTransition } from "react-transition-group"

type QueueProps = { tasks: GenerationTask[] }

export default function Queue({ tasks }: QueueProps) {
    const onDragEnd = ({ destination, source }: DropResult) => {
        // dropped outside the list
        if (!destination) return

        const newItems = reorder<GenerationTask>(
            tasks,
            source.index,
            destination.index
        )

        setState({ queue: newItems })
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
                            <TransitionGroup>
                                {tasks.map((item, index) => (
                                    <CSSTransition
                                        key={item.id}
                                        appear={true}
                                        timeout={300}
                                        classNames="queue-item"
                                    >
                                        <QueueItem
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            dragEnabled={
                                                item.status ===
                                                    GTaskStatus.READY ||
                                                item.status ===
                                                    GTaskStatus.NOT_READY
                                            }
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}
