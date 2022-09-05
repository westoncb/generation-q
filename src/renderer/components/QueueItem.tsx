import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import GenerationTask from "@src/generationTask"
import isEmpty from "lodash.isempty"

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
                    <div className="prompt-text-preview">
                        {getDisplayText(item)}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

function getDisplayText(item) {
    if (!isEmpty(item.prompt)) {
        return item.prompt
    } else {
        return "<new task>"
    }
}
