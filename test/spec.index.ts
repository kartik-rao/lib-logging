/// <reference path="../typings/globals/jasmine/index.d.ts" />
/// <reference path="../src/index.ts" />

import { Logger } from '../src/index';
const logger : Logger = Logger.getInstance();

describe('logger', () => { 
    describe('log', () => {
        it('should log a message to the console in debug mode', () => {
            let message = ["1","2","3","4"];
            logger.log.apply(logger, message);
            let history = logger.dump();
            expect(history.length).toBeGreaterThan(0);
            expect(Object.keys(history[0].message).length).toEqual(4);
        });
    });

    describe('logger.dump', () => {
        it('should send a message to console.log', () => {
            let history = logger.dump();
            expect(history.length).toBeGreaterThan(0);
        });
    });
});
