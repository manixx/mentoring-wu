import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {Goal, goalCollection} from 'src/app/goal/goal';
import {map, filter} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Setting, settingsDocument} from 'src/app/setting';

interface Box {
  x: number
  y: number
  width: number
  height: number
  word: string
  rotated: boolean
  relevance: number
  fontSize: number
  fill: string
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

interface Pivot {
  x: number
  y: number
}

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly changeRef: ChangeDetectorRef,
  ) { }

  @ViewChildren('word')
  readonly renderedWords: QueryList<ElementRef<SVGGraphicsElement>>

  goals: Goal[] = []
  boxes: Box[] = []
  viewBox: ViewBox = { x: -250, y: -250, width: 500, height: 500 }

  maxFontSize = 100
  minFontSize = 20

  colorMap: string[] = [
    'red',
    'blue',
    'green',
    'darkorange',
    'cadetblue',
    'blueviolet',
    'darkgoldenrod',
    'deeppink',
    'navy',
  ]

  words: string[]

  get viewBoxParsed() {
    return `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
  }

  ngOnInit() {

 }

  openSection = this.db
     .doc<Setting>(settingsDocument)
      .valueChanges()
      .pipe(
        map(s => !!s.openSection)
      )

  ngAfterViewInit() {
    this.changeRef.detectChanges()

    this.renderedWords
      .changes
      .subscribe(() => {
        this.setupBoundingBoxes()
        this.arrangeBoxes(this.boxes)
        this.resizeViewBox()
        this.changeRef.detectChanges()
      })

    this.db.collection<Goal>(goalCollection)
      .valueChanges()
      .subscribe(goals => {
        this.goals = goals
        this.words = this.goals.map(g => g.goal.toLowerCase())
        this.boxes = this.setup(this.words, this.goals)
        this.changeRef.detectChanges()
      })

  }

  refresh() {
    this.boxes = this.setup(this.words, this.goals)
  }

  getTooltip(box: Box) {
    return `${box.word}: ~${Math.floor(box.relevance * 100)}%`
  }

  normalizePosition(box: Box): Pivot {
    if(box.rotated) {
      return {
        x: box.x,
        y: box.y,
      }
    }
    else {
      return {
        x: box.x,
        y: box.y + box.height,
      }
    }
  }

  getTranformation(box: Box) {
    //const normalized = this.normalizePosition(box)
    //let transform = `translate(${normalized.x} ${normalized.y})`

    if(box.rotated) {
      return `rotate(90 ${box.x} ${box.y})`
    }

    //return transform
  }


  setup(words: string[], goals: Goal[]): Box[] {
    const boxes: Box[] = []

    for (const word of words) {
      if(boxes.find(b => b.word === word)) continue // skip duplicates

      const relevance = (
        (words.filter(w => w === word).length + goals.filter(g => g.goal.toLowerCase() === word && g.important).length)
        / words.length
      )
      const fontSize = (
        (relevance * 100 * (this.maxFontSize - this.minFontSize) / 100) + this.minFontSize
      )

      boxes.push({
        x: 0,
        y: 0,
        height: null,
        width: null,
        rotated: Math.random() >= 0.7,
        relevance,
        word,
        fontSize,
        fill: this.colorMap[Math.floor(Math.random() * this.colorMap.length)],
      })
    }

    return boxes
  }

  setupBoundingBoxes() {
    this.renderedWords.forEach(item => {
      const index = +item.nativeElement.getAttribute('index')
      const boundingBox = item.nativeElement.getBBox()

      if(!this.boxes[index].rotated) {
        this.boxes[index].width = boundingBox.width
        this.boxes[index].height = boundingBox.height
      }
      else {
        // if word will be rotated, then swap dimensions
        this.boxes[index].height = boundingBox.width
        this.boxes[index].width = boundingBox.height
      }
    })
  }

  private randomBetweenRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
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

          for (let i = 0; i < 50; i++) {

            switch(side) {
              case Side.Top:
                box.x = this.randomBetweenRange(parentBox.x, parentBox.x + parentBox.width)
                box.y = parentBox.y - box.height - 5
                break;
              case Side.Bottom:
                box.x = this.randomBetweenRange(parentBox.x, parentBox.x + parentBox.width)
                box.y = parentBox.y + parentBox.height + 5
                break;
              case Side.Left:
                box.x = parentBox.x - box.width - 5
                box.y = this.randomBetweenRange(parentBox.y, parentBox.y + parentBox.height)
                break;
              case Side.Right:
                box.x = parentBox.x + parentBox.width + 5
                box.y = this.randomBetweenRange(parentBox.y, parentBox.y + parentBox.height)
                break;
            }

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
    this.viewBox.x = Math.min(...this.boxes.map(b => b.x)) - 5
    this.viewBox.y = Math.min(...this.boxes.map(b => b.y)) - 5
    this.viewBox.width = Math.abs(this.viewBox.x) + Math.max(...this.boxes.map(b => b.x + b.width)) + 5
    this.viewBox.height = Math.abs(this.viewBox.y) + Math.max(...this.boxes.map(b => b.y + b.height)) + 5
  }

  cleanup() {
    const ref = this.db.collection(goalCollection)
      .get()
      .subscribe(goals => {
        goals.forEach(g => g.ref.delete())
        ref.unsubscribe()
      })
  }
}
