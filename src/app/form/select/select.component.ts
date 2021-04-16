import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit {
  // normal Select
  normalSelect = new FormControl({ id: '1', name: 'Dog', sound: 'Woof!' }, Validators.required);
  animals: any[] = [
    { id: '1', name: 'Dog', sound: 'Woof!' },
    { id: '2', name: 'Cat', sound: 'Meow!' },
    { id: '3', name: 'Cow', sound: 'Moo!' },
    { id: '4', name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];
  // multiple Select
  multipleSelect = new FormControl([{ id: '1', name: 'Dog', sound: 'Woof!' }]);


  // Select multiple && search
  constructor(private cdr: ChangeDetectorRef) { }

  // search select
  @ViewChild('search') searchTextBox: ElementRef;
  searchSelect = new FormControl({ id: '1', name: 'Dog', sound: 'Woof!' });
  searchBoxSelect = new FormControl();
  selectedValues = [];
  dataSearchSelect: Observable<any[]>;

  dataSearch: Observable<any[]>;

  // Search multiple select
  @ViewChild('search') searchMultipleTextBox: ElementRef;
  searchMultipleSelect = new FormControl([{ id: '1', name: 'Dog', sound: 'Woof!' }]);
  searchBoxMultipleSelect = new FormControl();
  selectedMultipleValues = [];

  dataSearchMultipleSelect: Observable<any[]>;

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.dataSearch = this.searchBoxSelect.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filterSearch(name))
      );

    this.dataSearchMultipleSelect = this.searchBoxMultipleSelect.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filterSearchMultip(name))
      );
  }

  deleteAll(event: any): void {
    this.normalSelect.patchValue(null);
    event.stopPropagation();
  }

  deleteItem(data: any, index: number): void {
    (data || []).splice(index, 1);
    event.stopPropagation();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  // search Select
  /**
   * Used to filter data based on search input
   */
  private _filterSearch(name: string): string[] {
    const filterValue = name.toLowerCase();
    const filteredList = this.animals.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  /**
   * Clearing search textbox value
   */
  clearSearch(event): void {
    event.stopPropagation();
    this.searchBoxSelect.patchValue('');
  }



  // Search multiple select

  /**
    * Used to filter data based on search input 
    */
  private _filterSearchMultip(name: string): string[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedMultipleValues();
    this.searchMultipleSelect.patchValue(this.selectedMultipleValues);
    const filteredList = this.animals.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  /**
   * Remove from selected values based on uncheck
   */
  selectionMultipleChange(event): void {
    if (event.isUserInput && event.source.selected === false) {
      const index = this.selectedMultipleValues.indexOf(event.source.value);
      this.selectedMultipleValues.splice(index, 1);
    }
  }

  openedChangeMultiple(e): void {
    // Set search textbox value as empty while opening selectbox
    this.searchBoxMultipleSelect.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e === true) {
      this.searchMultipleTextBox.nativeElement.focus();
    }
  }

  /**
   * Clearing search textbox value
   */
  clearSearchMultiple(event): void {
    event.stopPropagation();
    this.searchBoxMultipleSelect.patchValue('');
  }

  /**
   * Set selected values to retain the state
   */
  setSelectedMultipleValues(): void {
    if (this.searchMultipleSelect.value && this.searchMultipleSelect.value.length > 0) {
      this.searchMultipleSelect.value.forEach((e) => {
        if (this.selectedMultipleValues.indexOf(e) === -1) {
          this.selectedMultipleValues.push(e);
        }
      });
    }
  }
}
