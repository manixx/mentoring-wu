import { Component, OnInit } from '@angular/core';
import {GoalComponent} from 'src/app/admin/goal/goal.component';
import {OrientationComponent} from 'src/app/admin/orientation/orientation.component';
import {FeedbackComponent} from 'src/app/admin/feedback/feedback.component';
import { MatSlideToggleChange } from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {settingsDocument, Setting} from 'src/app/setting';
import {Section} from 'src/app/section';
import {map} from 'rxjs/operators';

interface Panel {
  name: string;
  component: any;
  section: Section;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
  ) { }

  panels: Panel[] = [
    {
      name: 'Ziele',
      component: GoalComponent,
      section: { key: 'goal', url: 'ziele' },
    },
    {
      name: 'Orientierung',
      component: OrientationComponent,
      section: { key: 'orientation', url: 'orientierung' },
    },
    {
      name: 'Feedback',
      component: FeedbackComponent,
      section: { key: 'feedback', url: 'feedback' },
    },
  ];

  settings = this.db.doc<Setting>(settingsDocument);
  openSection: Section = null;

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(
        map(s => s.openSection)
      )
      .subscribe(section => this.openSection = section);
  }

  toggleSection(panel: Panel,  event: MatSlideToggleChange) {
    if (event.checked === false) {
      this.settings.update({ openSection: null });
      return;
    }
    this.settings.update({ openSection: panel.section });
  }

  isSectionOpen(panel: Panel) {
    return this.openSection && this.openSection.key === panel.section.key;
  }

}
