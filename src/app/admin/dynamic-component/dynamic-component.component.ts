import {
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly cd: ChangeDetectorRef,
  ) { }

  @Input()
  component: any;

  @ViewChild('container', { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  private componentRef: ComponentRef<unknown>;

  ngAfterViewInit() {
    this.container.clear();

    const factory = this.resolver.resolveComponentFactory(this.component);

    this.componentRef =  this.container.createComponent(factory);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
