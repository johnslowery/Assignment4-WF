import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretUserComponent } from './secret-user.component';

describe('SecretUserComponent', () => {
  let component: SecretUserComponent;
  let fixture: ComponentFixture<SecretUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
