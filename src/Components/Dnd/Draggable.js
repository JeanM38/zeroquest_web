import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { setTransformPosByPieceType } from '../../utils/dnd';

export const Draggable = (props) => { 
  const {attributes, listeners, isDragging, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: props.data
  });
 
  const style = {
    display: 'flex',
    position: props.parent[0] !== props.data || isDragging ? 'absolute' : undefined, /* Check if piece is on his deck */
    justifyContent: 'center',
    alignItems: 'center',
    width: props.data !== 'enemy' ? `${30 * props.properties.width}px` : '30px',   /* If is an anemy, doesn't care of scaling */
    height: props.data !== 'enemy' ? `${30 * props.properties.height}px` : '30px', /* # */
    zIndex: isDragging ? 999: undefined,
    transform: transform ? `
      translate3d(${transform.x}px, ${transform.y - (props.parent[0] === props.data ? props.scrollTop : 0)}px, 0) rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)` : 
      `rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)`, /* Rotate event display */
    opacity: transform ? '0.8' : '1',
    backgroundImage: `url('${process.env.PUBLIC_URL}/Resources/Images/${props.image}.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    transformOrigin: props.properties ? setTransformPosByPieceType(props.properties) : 'unset',
  }

  const rotatePiece = (key) => {
    if ((key.nativeEvent.which === 3 || key.code === 'KeyR') && ['furniture', 'trap', 'door'].includes(props.data)) {
      props.rotate();
    }
  }
  
  return (
    <div 
      {...listeners} 
      {...attributes} 
      ref={setNodeRef} 
      style={{...style}} 
      onKeyDown={(e) => rotatePiece(e)} data-testid={'draggable'}
    >
    </div>
  );
}