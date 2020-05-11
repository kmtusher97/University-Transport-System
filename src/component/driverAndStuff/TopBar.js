import React, { Component } from 'react'
import { Button, Col, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TopBar extends Component {
  constructor() {
    super();
    this.goToPageNo = this.goToPageNo.bind(this);
  }

  goToPageNo = (event, pageNo) => {
    window.location.replace(`/${this.props.data.type}/page/${pageNo}`);
  };

  render() {
    const maxButtons = 5;
    const buttons = [];

    if (this.props.data.pageNo > 1) {
      buttons.push(
        <Button
          key={this.props.data.pageNo - 1}
          size="sm"
          variant="outline-primary"
          onClick={event => this.goToPageNo(event, this.props.data.pageNo - 1)}
        >
          {this.props.data.pageNo - 1}
        </Button>
      );
    }

    buttons.push(
      <Button
        key={this.props.data.pageNo}
        size="sm"
        variant="primary"
        onClick={event => this.goToPageNo(event, this.props.data.pageNo)}
      >
        {this.props.data.pageNo}
      </Button>
    );

    for (
      let i = this.props.data.pageNo + 1;
      i <= Math.min(
        this.props.data.pageCount - 1,
        this.props.data.pageNo + maxButtons
      );
      i++
    ) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          variant="outline-primary"
          onClick={event => this.goToPageNo(event, i)}
        >
          {i}
        </Button>
      );
    }
    if (this.props.data.pageCount - this.props.data.pageNo + 1 > maxButtons) {
      buttons.push(
        <Button
          key={0}
          size="sm"
          variant="outline-primary"
          disabled
        >
          <strong>......</strong>
        </Button>
      );
    }
    if (this.props.data.pageCount - this.props.data.pageNo + 1 > 1) {
      buttons.push(
        <Button
          key={this.props.data.pageCount}
          size="sm"
          variant="outline-primary"
          onClick={event => this.goToPageNo(event, this.props.data.pageCount)}
        >
          {this.props.data.pageCount}
        </Button>
      );
    }


    return (
      <React.Fragment>
        <Col md={3} style={{ padding: "5px", paddingLeft: "15px" }}>
          <Link to={`/${this.props.data.type}/add`}>
            <Button size="sm" variant="outline-primary">
              {"Add " + this.props.data.type}
            </Button>
          </Link>
        </Col>
        <Col md={9} style={{ padding: "5px", paddingRight: "15px" }}>
          <ButtonGroup size="sm" style={{ float: "right" }}>
            {buttons}
          </ButtonGroup>
        </Col>
      </React.Fragment>
    )
  }
}

export default TopBar;