import {registerTranslation} from 'react-native-paper-dates';
import type {TranslationsType} from 'react-native-paper-dates';

const paperDatesEn: TranslationsType = {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat: string) =>
    `Date must be in ${inputFormat} format`,
  mustBeHigherThan: (date: string) => `Must be later than ${date}`,
  mustBeLowerThan: (date: string) => `Must be earlier than ${date}`,
  mustBeBetween: (startDate: string, endDate: string) =>
    `Must be between ${startDate} and ${endDate}`,
  dateIsDisabled: 'This date is disabled',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
  hour: 'Hour',
  minute: 'Minute',
};

const paperDatesEs: TranslationsType = {
  save: 'Guardar',
  selectSingle: 'Seleccionar fecha',
  selectMultiple: 'Seleccionar fechas',
  selectRange: 'Seleccionar período',
  notAccordingToDateFormat: (inputFormat: string) =>
    `La fecha debe tener el formato ${inputFormat}`,
  mustBeHigherThan: (date: string) => `Debe ser posterior a ${date}`,
  mustBeLowerThan: (date: string) => `Debe ser anterior a ${date}`,
  mustBeBetween: (startDate: string, endDate: string) =>
    `Debe estar entre ${startDate} y ${endDate}`,
  dateIsDisabled: 'Esta fecha está deshabilitada',
  previous: 'Anterior',
  next: 'Siguiente',
  typeInDate: 'Escribir fecha',
  pickDateFromCalendar: 'Elegir fecha del calendario',
  close: 'Cerrar',
  hour: 'Hora',
  minute: 'Minuto',
};

export function registerPaperDatesTranslations() {
  registerTranslation('en', paperDatesEn);
  registerTranslation('es', paperDatesEs);
}
