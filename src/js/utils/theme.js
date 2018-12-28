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
button {
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
`;
