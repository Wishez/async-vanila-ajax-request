import $ from 'jquery';
import UserRaiting from '../src/UserRaiting';

const $test = $('#test');

export function test(describe, fn) {
    let errorMessage = false;
    const now = Date.now();

    try {
        fn();
    } catch (e) {
        errorMessage = '<strong class="testBlock__failure">' + e.message + '</strong>';
    }

    const later = Date.now();
    const delta = later - now;
    const html = `
        <section class="testBlock">
            <h2 class="testBlock__title font-weight_semi">${describe}</h2>
            <p class="testBlock__notification">${errorMessage ?  
                '<span>Тест не пройден: '+errorMessage+'</span>'
                : `<span class="testBlock__success">Тест пройден за ${delta}ms!</span>`}
            </p>
        </section>
    `;

    $test.append(html);
}

export function setTestsSubheading(testModuleName) {
    const heading = `<h3 class="testBlock__subheading">${testModuleName}</h3>`;

    $test.append(heading);
}

export const SELECTORS = {
    name: ".rankName_1",
    gradient: ".raitingGradientColor_1",
    border: ".raitingBorder_1",
    raiting: ".userRaiting_1"
};

export const BORDER_RANGE = {
    max: 135.717,
    min: 340
};

export const TEST_USER_RAITING_DATA = {
    raiting: 50,
    userId: 6446,
};

export function _createUserRaiting(currentRaiting = 50) {
    const testData = Object.create(TEST_USER_RAITING_DATA);
    testData.raiting = currentRaiting;

    return new UserRaiting(testData);
}