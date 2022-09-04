import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { GenerationTask } from "@src/types"

export default function QueueItem({
    item,
    index,
}: {
    item: GenerationTask
    index: number
}) {
    return (
        <Draggable draggableId={`${item.id}`} index={index} key={item.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                        "queue-item " +
                        (snapshot.isDragging ? "dragging-queue-item" : "")
                    }
                >
                    <div className="prompt-text-preview">{item.prompt}</div>
                </div>
            )}
        </Draggable>
    )
}
