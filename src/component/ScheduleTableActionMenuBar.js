import React, { Component } from 'react';
import { ButtonGroup, Button, Overlay, Popover } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class ScheduleTableActionMenuBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={event =>
            this.deleteScheduleConfirmation(
              event,
              this.props.schedule.assignmentId
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Overlay
          show={this.props.data.show}
          target={this.props.data.target}
          placement="left"
          container={this.props.ref1.current}
          containerPadding={20}
        >
          <Popover id="deleteScheduleConfirmation">
            <Popover.Title>Are you sure??</Popover.Title>
            <Popover.Content>
              <ButtonGroup size="sm">
                <Button
                  variant="outline-danger"
                  onClick={this.props.deleteSchedule}
                >
                  Yes
                </Button>
                <Button
                  variant="outline-success"
                  onClick={this.props.abortDelete}
                >
                  No
                </Button>
              </ButtonGroup>
            </Popover.Content>
          </Popover>
        </Overlay>
      </React.Fragment>
    )
  }
}

export default ScheduleTableActionMenuBar;