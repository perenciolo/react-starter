import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Modal
} from 'reactstrap';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], activeIndex: 0, modal: false };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/dist/data/data.json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;'
      }
    })
      .then(res => {
        return res.data;
      })
      .then(res => {
        this.setState({ data: res.slice(0, 99) });
        return this.state.data;
      });
    // .then(data => console.log(data));
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  toggle(id) {
    this.setState({
      modal: id
    });
  }

  render() {
    console.log('this.state.data :', this.state.data);
    const { activeIndex } = this.state;
    return (
      <Container>
        <Row>
          {this.state.data.map((photo, i) => (
            <div key={'wp' + photo.id} style={{ width: 20 + '%' }}>
              <Card onClick={() => this.toggle(photo.id)} key={photo.id}>
                <CardImg
                  top
                  style={{ width: 150 + 'px' }}
                  src={photo.thumbnailUrl}
                  alt="Card image cap"
                />
              </Card>
              <Modal
                key={'md-' + photo.id}
                isOpen={this.state.modal === photo.id}
                toggle={this.toggle}
                className={this.props.className}
                backdrop={this.state.backdrop}
              >
                <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
                >
                  <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={photo.id}
                  >
                    <img
                      src={photo.url}
                      style={{
                        maxWidth: 600 + 'px',
                        maxHeight: 600 + 'px'
                      }}
                      alt=""
                    />
                  </CarouselItem>
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={this.previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={this.next}
                  />
                </Carousel>
              </Modal>
            </div>
          ))
          // <img
          //   src={photo.thumbnailUrl}
          //   style={{ width: 150 + 'px', height: 150 + 'px' }}
          //   className="img-fluid"
          //   alt=""
          // />
          }
        </Row>
      </Container>
    );
  }
}

export default App;
