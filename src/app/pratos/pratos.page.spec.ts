import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PratosPage } from './pratos.page';

describe('PratosPage', () => {
  let component: PratosPage;
  let fixture: ComponentFixture<PratosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
