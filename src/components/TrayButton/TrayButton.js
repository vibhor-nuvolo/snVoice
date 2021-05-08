import React from 'react';
import './TrayButton.css';
import Icon, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE,
  TYPE_CHAT,
} from '../Icon/Icon';

/**
 * Props:
 * - type: string
 * - disabled: boolean
 * - highlighted: boolean
 * - onClick: () => ()
 * - newButtonGroup: boolean
 */
export default function TrayButton(props) {
  if (props.snVoice){
    if(props.isActive){
      return(<button
      disabled={props.disabled}
      onClick={props.onClick}
      style={{backgroundColor: 'aqua'}}
      className={'tray-button' + (props.newButtonGroup ? ' new-group' : '')}
    >
      SN Voice
    </button>)
    }
    return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      style={{backgroundColor: 'grey'}}
      className={'tray-button' + (props.newButtonGroup ? ' new-group' : '')}
    >
      SN Voice
    </button>
    )
  }
  
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={'tray-button' + (props.newButtonGroup ? ' new-group' : '')}
    >
      <Icon type={props.type} highlighted={props.highlighted} />
    </button>
  );
}

export { TYPE_MUTE_CAMERA, TYPE_MUTE_MIC, TYPE_SCREEN, TYPE_LEAVE, TYPE_CHAT };
