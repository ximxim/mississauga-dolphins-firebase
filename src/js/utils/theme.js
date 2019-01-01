import { createGlobalStyle } from 'styled-components';

export default {
    brandPrimary: '#05301d',
    brandDark: '#031b10',
    darkGrey: '#484848',
    white: 'white',
    selection: '#9dccb6',
    bodyFont: 'Comfortaa',
    headingFont: 'Laila',
};

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.bodyFont};
}

.padder {
    padding: 10px;
}

.marginBottom {
    margin-bottom: 10px;
}

.marginBottomx50 {
    margin-bottom: 50px;
}

.marginTopx50 {
    margin-top: 50px;
}

.hidden {
    display: none;
}

h4.helper {
    padding-top: 20px;
    text-align: left;
    font-weight: 500;
    font-size: 20px;
    color: ${props => props.theme.darkGrey};
    border-bottom: 1px solid grey;
}

.btn.center {
    justify-content: center;
    align-items: center;
    margin: auto;
}

::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
}

.bg-primary {
    background-color: #05301d !important;
}

.bg-dark {
    background-color: #031b10 !important;
}

h1,
h2,
h3,
h4,
h5,
h6, 
.heading {
    font-family: ${props => props.theme.headingFont};
}

.popover-body {
    max-height: 350px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0px !important;
}

.bs-popover-auto[x-placement^=bottom] .arrow::after,
.bs-popover-bottom .arrow::after {
    border-bottom-color: ${props => props.theme.brandDark};
}

.bs-popover-auto[x-placement^=bottom] .popover-header::before,
.bs-popover-bottom .popover-header::before {
    border-bottom: 0px !important;
}

.popover-header {
    background-color: #031b10;
    color: ${props => props.theme.white};
}

.popover {
    border-radius: 10px;
    border: ${props => `2px solid ${props.theme.brandDark}`};
}

a { 
    color: initial;
}

a:hover { 
    color: initial;
}

.border-2 {
	border: ${props => `2px solid ${props.theme.darkGrey} !important`};
}

.rounded {
	border-radius: 10px !important;
}

.overflow-hidden {
	overflow: hidden !important;
}

.fs-1 {
	font-size: 12px !important;
}
.fs-2 {
	font-size: 14px !important;
}
.fs-3 {
	font-size: 16px !important;
}
.fs-4 {
	font-size: 18px !important;
}
.fs-5 {
	font-size: 20px !important;
}
.fs-6 {
	font-size: 22px !important;
}
td, th {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    text-align: center;
    vertical-align: middle !important;
}
input {
    border-radius: 10px !important;
    border: ${props => `2px solid ${props.theme.brandPrimary} !important`};
    padding: .375rem .75rem
    margin-top: 5px;
    margin-bottom: 5px;
}
button, .btn {
    border-width: 2px !important;
    border-radius: 10px !important;
}
.modal-header {
    padding-top: 15px;
    padding-bottom: 5px;
    background-color: ${props => `${props.theme.brandPrimary} !important`};
    color: white !important;
}
.modal-footer {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: ${props => `1px solid ${props.theme.brandPrimary} !important`};
    -webkit-box-shadow: 0px -2px 5px 0px rgba(175, 174, 174, 0.75);
    -moz-box-shadow: 0px -2px 5px 0px rgba(175, 174, 174, 0.75);
    box-shadow: 0px -2px 5px 0px rgba(175, 174, 174, 0.75);
    z-index: 2000;
}
.modal-content {
    border-radius: 10px !important;
    border: ${props => `2px solid ${props.theme.brandPrimary}`}
}
.close {
    color: white !important;
}
.btn-outline-primary {
    border-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.brandPrimary};
}
.btn-outline-primary:hover {
    border-color: ${props => props.theme.brandPrimary};
    background-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.white};
}
.btn-outline-primary.disabled {
    border-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.brandPrimary};
}
.btn-outline-primary.disabled:hover {
    border-color: ${props => props.theme.brandPrimary};
    background-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.white};
}
.rounded-15 {
    border-radius: 15px;
}
.card {
    border-radius: 10px;
    overflow: hidden;
    border: ${props => `2px solid ${props.theme.brandPrimary}`}
}
.card-header {
    background-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.white};
    padding-bottom: 5px;
    padding-top: 5px;
    font-family: ${props => props.theme.headingFont};
}
.card-body {
    padding: 5px;
}
.alert {
    border-radius: 10px;
}
.navbar-nav button {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}
textarea {
    border-radius: 10px !important;
    border: ${props => `2px solid ${props.theme.brandPrimary} !important`};
    margin-top: 5px;
    margin-bottom: 5px;
}
label {
    margin-top: 10px;
    margin-bottom: 0px;
}
/*!
 * https://github.com/YouCanBookMe/react-datetime
 */

.rdt {
  position: relative;
}
.rdtPicker {
  display: none;
  position: absolute;
  width: 250px;
  padding: 4px;
  margin-top: 1px;
  z-index: 99999 !important;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  border: 1px solid #f9f9f9;
}
.rdtOpen .rdtPicker {
  display: block;
}
.rdtStatic .rdtPicker {
  box-shadow: none;
  position: static;
}

.rdtPicker .rdtTimeToggle {
  text-align: center;
}

.rdtPicker table {
  width: 100%;
  margin: 0;
}
.rdtPicker td,
.rdtPicker th {
  text-align: center;
  height: 28px;
}
.rdtPicker td {
  cursor: pointer;
}
.rdtPicker td.rdtDay:hover,
.rdtPicker td.rdtHour:hover,
.rdtPicker td.rdtMinute:hover,
.rdtPicker td.rdtSecond:hover,
.rdtPicker .rdtTimeToggle:hover {
  background: #eeeeee;
  cursor: pointer;
}
.rdtPicker td.rdtOld,
.rdtPicker td.rdtNew {
  color: #999999;
}
.rdtPicker td.rdtToday {
  position: relative;
}
.rdtPicker td.rdtToday:before {
  content: '';
  display: inline-block;
  border-left: 7px solid transparent;
  border-bottom: 7px solid #428bca;
  border-top-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 4px;
  right: 4px;
}
.rdtPicker td.rdtActive,
.rdtPicker td.rdtActive:hover {
  background-color: #428bca;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.rdtPicker td.rdtActive.rdtToday:before {
  border-bottom-color: #fff;
}
.rdtPicker td.rdtDisabled,
.rdtPicker td.rdtDisabled:hover {
  background: none;
  color: #999999;
  cursor: not-allowed;
}

.rdtPicker td span.rdtOld {
  color: #999999;
}
.rdtPicker td span.rdtDisabled,
.rdtPicker td span.rdtDisabled:hover {
  background: none;
  color: #999999;
  cursor: not-allowed;
}
.rdtPicker th {
  border-bottom: 1px solid #f9f9f9;
}
.rdtPicker .dow {
  width: 14.2857%;
  border-bottom: none;
  cursor: default;
}
.rdtPicker th.rdtSwitch {
  width: 100px;
}
.rdtPicker th.rdtNext,
.rdtPicker th.rdtPrev {
  font-size: 21px;
  vertical-align: top;
}

.rdtPrev span,
.rdtNext span {
  display: block;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}

.rdtPicker th.rdtDisabled,
.rdtPicker th.rdtDisabled:hover {
  background: none;
  color: #999999;
  cursor: not-allowed;
}
.rdtPicker thead tr:first-child th {
  cursor: pointer;
}
.rdtPicker thead tr:first-child th:hover {
  background: #eeeeee;
}

.rdtPicker tfoot {
  border-top: 1px solid #f9f9f9;
}

.rdtPicker button {
  border: none;
  background: none;
  cursor: pointer;
}
.rdtPicker button:hover {
  background-color: #eee;
}

.rdtPicker thead button {
  width: 100%;
  height: 100%;
}

td.rdtMonth,
td.rdtYear {
  height: 50px;
  width: 25%;
  cursor: pointer;
}
td.rdtMonth:hover,
td.rdtYear:hover {
  background: #eee;
}

.rdtCounters {
  display: inline-block;
}

.rdtCounters > div {
  float: left;
}

.rdtCounter {
  height: 100px;
}

.rdtCounter {
  width: 40px;
}

.rdtCounterSeparator {
  line-height: 100px;
}

.rdtCounter .rdtBtn {
  height: 40%;
  line-height: 40px;
  cursor: pointer;
  display: block;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}
.rdtCounter .rdtBtn:hover {
  background: #eee;
}
.rdtCounter .rdtCount {
  height: 20%;
  font-size: 1.2em;
}

.rdtMilli {
  vertical-align: middle;
  padding-left: 8px;
  width: 48px;
}

.rdtMilli input {
  width: 100%;
  font-size: 1.2em;
  margin-top: 37px;
}

.rdtTime td {
  cursor: default;
}
.modal-body {
  max-height: 75vh;
  overflow: auto;
}
`;
