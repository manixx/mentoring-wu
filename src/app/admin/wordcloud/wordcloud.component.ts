import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';

interface Box {
  x: number
  y: number
  width: number
  height: number
  word: string
  rotated: boolean
  relevance: number
}

interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

enum Side {
  Top,
  Bottom,
  Left,
  Right,
}

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly changeRef: ChangeDetectorRef,
  ) { }

  @ViewChild('container', { static: false })
  readonly container: ElementRef<HTMLElement>

  @ViewChildren('word')
  readonly renderedWords: QueryList<ElementRef<SVGGraphicsElement>>

  words = ['test', 'test', 'test', 'gello']
  boxes: Box[] = []
  viewBox: ViewBox = { x: -250, y: -250, width: 500, height: 500 }

  get viewBoxParsed() {
    return `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
  }

  ngOnInit() {
    this.boxes = this.setup(this.words)
 }

  ngAfterViewInit() {
    this.setupBoundingBoxes(this.boxes)
    this.arrangeBoxes(this.boxes)
    this.resizeViewBox()

    console.log(this.boxes)

    this.changeRef.detectChanges()
  }

  normalizePosition(box: Box) {
      return {
        x: box.x,
        y: box.y + box.height,
      }
  }

  setup(words: string[]): Box[] {
    const boxes: Box[] = []

    for (const word of words) {
      if(boxes.find(b => b.word === word)) continue // skip duplicates

      boxes.push({
        x: 0,
        y: 0,
        height: null,
        width: null,
        //rotated: Math.random() >= 0.5,
        rotated: true,
        relevance: words.filter(w => w === word).length / words.length,
        word,
      })
    }

    return boxes
  }

  setupBoundingBoxes(boxes: Box[]) {
    this.renderedWords.forEach(item => {
      const index = +item.nativeElement.getAttribute('index')
      const boundingBox = item.nativeElement.getBBox()

      if(!boxes[index].rotated) {
        boxes[index].width = boundingBox.width
        boxes[index].height = boundingBox.height
      }
      else {
        // if word will be rotated, then swap dimensions
        boxes[index].height = boundingBox.width
        boxes[index].width = boundingBox.height
      }
    })
  }

  arrangeBoxes(boxes: Box[]) {
    // sort after relevance
    boxes.sort((a, b) => b.relevance - a.relevance)

    for (const box of boxes) {
      const parentBoxes = boxes.slice(0, boxes.indexOf(box)) // get previous boxes
      const sides: Side[] = [Side.Top, Side.Bottom, Side.Left, Side.Right]

      // skip first box
      if(boxes.indexOf(box) === 0) {
        box.x = box.y = 0
        continue
      }

      parentBox: for (const parentBox of parentBoxes) {
        for (const side of sides) {

          switch(side) {
            case Side.Top:
              box.x = parentBox.x
              box.y = parentBox.y - box.height
              break;
            case Side.Bottom:
              box.x = parentBox.x
              box.y = parentBox.y + parentBox.height
              break;
            case Side.Left:
              box.x = parentBox.x - box.width
              box.y = parentBox.y
              break;
            case Side.Right:
              box.x = parentBox.x + parentBox.width
              box.y = parentBox.y
              break;
          }

          // check if box is colliding with any other boxes
          if(!parentBoxes.filter(p => this.checkCollission(box, p)).length) {
            break parentBox
          }
        }
      }
    }
  }

  checkCollission(box1: Box, box2: Box) {
    return box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
  }

  resizeViewBox() {
    this.viewBox.x = Math.min(...this.boxes.map(b => b.x))
    this.viewBox.y = Math.min(...this.boxes.map(b => b.y))
    this.viewBox.width = Math.abs(this.viewBox.x) + Math.max(...this.boxes.map(b => b.x + b.width))
    this.viewBox.height = Math.abs(this.viewBox.y) + Math.max(...this.boxes.map(b => b.y + b.height))
  }
}
