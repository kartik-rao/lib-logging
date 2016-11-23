/// <reference path="../typings/globals/jasmine/index.d.ts" />
/// <reference path="../src/index.ts" />

import { Logger } from '../src/index';

describe('logger', () => { 
    describe('log', () => {
        it('should log a message to the console if severity > minSeverity', () => {
            let logger : Logger = Logger.getInstance();
            logger.log(Logger.severity.debug, "part1", "part2", "part3");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
            expect(history[0].severity).toEqual('debug');
            expect(Object.keys(history[0].message).length).toEqual(4);
        });
    });

    describe('info', () => {
        it('should log a message to the console if severity > minSeverity', () => {
            let logger : Logger = Logger.getInstance();
            logger.info("part1", "part2", "part3");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
            expect(history[0].severity).toEqual('info');
            // [info] part1 part2 part3
            expect(Object.keys(history[0].message).length).toEqual(4);
        });
    });

        describe('warn', () => {
        it('should log a message to the console if severity > minSeverity', () => {
            let logger : Logger = Logger.getInstance();
            logger.warn("part1", "part2", "part3");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
            expect(history[0].severity).toEqual('warn');
            // [warn] part1 part2 part3
            expect(Object.keys(history[0].message).length).toEqual(4);
        });
    });

    describe('error', () => {
        it('should always log a message to the console', () => {
            let logger : Logger = Logger.getInstance();
            logger.error("part1", "part2", "part3", "part4");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
            expect(history[0].severity).toEqual('error');
            // [error] part1 part2 part3 part4
            expect(Object.keys(history[0].message).length).toEqual(5);
        });
    });

    describe('logger.dump', () => {
        it('should send a message to console.log', () => {
            const logger : Logger = Logger.getInstance();
            logger.log(Logger.severity.warn, "test message");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
        });
    });
});
