/// <reference path="../typings/globals/jasmine/index.d.ts" />
/// <reference path="../src/index.ts" />

import { Logger } from '../src/index';

describe('logger', () => {
    let logger = Logger.getInstance();
    beforeEach(() => {
        logger.clear();
    });

    describe('log', () => {
        it('should log a message to the console if severity > minSeverity', () => {
            logger.log(Logger.severity.debug, "part1", "part2", "part3");
            let history = logger.getLogHistory();
            expect(history.length).toBeGreaterThan(0);
            expect(history[0].severity).toEqual('debug');
            expect(Object.keys(history[0].message).length).toEqual(4);
        });
    });

    describe('info', () => {
        it('should log a message to the console if severity > minSeverity', () => {
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
            logger.log(Logger.severity.warn, "test message");
            spyOn(console, "warn");
            logger.dump(Logger.severity.debug);
            expect(console.warn).toHaveBeenCalled();
        });
    });

    describe('logger.clear', () => {
        it('should clear log history', () => {
            logger.log(Logger.severity.warn, "test message");
            expect(logger.getLogHistory().length).toEqual(1);
            logger.clear();
            expect(logger.getLogHistory().length).toEqual(0);
        });
    });

    describe('logger.dir', () => {
        it('should output an object using console.dir', () => {
            spyOn(console, "dir");
            logger.dir({a:1, b:2});
            expect(console.dir).toHaveBeenCalled();
        });
    });

    describe('logger.dirxml', () => {
        it('should output an object using console.dir', () => {
            spyOn(console, "dirxml");
            logger.dirxml({a:1, b:2});
            expect(console.dirxml).toHaveBeenCalled();
        });
    });
});
