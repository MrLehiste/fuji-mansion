
import {it, describe, expect, beforeEach} from 'angular2/testing';
import {FmAppComponent} from './fm-app.component';

describe('FmAppComponent Tests', () => {
    let app: FmAppComponent;

    beforeEach(() => {
        app = new FmAppComponent();
    });

    it('App title should be Fuji Mansion App', () => {
        expect(app.title).toBe('Fuji Mansion App');
    });

    it('let me fail not', () => {
        expect(true).not.toBe(false);
    });
});
