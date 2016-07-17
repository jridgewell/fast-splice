import { expect } from 'chai';
import splice from '../src';

describe('Fast Splice', () => {
  let array;
  beforeEach(() => {
    array = [1, 2, 3, 4, 5];
  });

  function nativeSplice(array, ...args) {
    if (args.length === 3) {
      args.push(...args.pop());
    }
    return array.splice.apply(array, args);
  }

  function test(message, cb) {
    it(message, () => {
      return cb(splice);
    });

    it(message + ' (native)', () => {
      return cb(nativeSplice);
    });
  }

  describe('with no arguments', () => {
    test('errors', (splice) => {
      expect(() => {
        splice();
      }).to.throw(TypeError);
    });
  });

  describe('with only array argument', () => {
    test('leaves array untouched', (splice) => {
        splice(array);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
    });

    test('returns empty array', (splice) => {
        expect(splice(array)).to.deep.equal([]);
    });
  });

  describe('with start index', () => {
    test('removes everything after index', (splice) => {
      splice(array, 3);
      expect(array).to.deep.equal([1, 2, 3]);
    });

    test('returns removed elements', (splice) => {
      expect(splice(array, 3)).to.deep.equal([4, 5]);
    });

    describe('with 0 start index', () => {
      test('removes everything after index', (splice) => {
        splice(array, 0);
        expect(array).to.deep.equal([]);
      });

      test('returns removed elements', (splice) => {
        expect(splice(array, 0)).to.deep.equal([1, 2, 3, 4, 5]);
      });
    });

    describe('with high start index', () => {
      test('removes nothing', (splice) => {
        splice(array, array.length + 1);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, array.length + 1)).to.deep.equal([]);
      });
    });

    describe('with negative start index', () => {
      test('removes count from the end', (splice) => {
        splice(array, -1);
        expect(array).to.deep.equal([1, 2, 3, 4]);
      });

      test('returns removed elements', (splice) => {
        expect(splice(array, -1)).to.deep.equal([5]);
      });
    });

    describe('with very negative start index', () => {
      test('removes everything', (splice) => {
        splice(array, -1 - array.length);
        expect(array).to.deep.equal([]);
      });

      test('returns everything', (splice) => {
        expect(splice(array, -1 - array.length)).to.deep.equal([1, 2, 3, 4, 5]);
      });
    });

    describe('with odd start index', () => {
      test('removes everything', (splice) => {
        splice(array, null);
        expect(array).to.deep.equal([]);
      });

      test('returns everything', (splice) => {
        expect(splice(array, null)).to.deep.equal([1, 2, 3, 4, 5]);
      });
    });
  });

  describe('with delete count', () => {
    test('removes count after start index', (splice) => {
      splice(array, 0, 2);
      expect(array).to.deep.equal([3, 4, 5]);
    });

    test('returns removed elements', (splice) => {
      expect(splice(array, 0, 2)).to.deep.equal([1, 2]);
    });

    describe('with 0 delete count', () => {
      test('removes nothing', (splice) => {
        splice(array, 3, 0);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 3, 0)).to.deep.equal([]);
      });

      describe('with 0 start index', () => {
        test('removes nothing', (splice) => {
          splice(array, 0, 0);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, 0, 0)).to.deep.equal([]);
        });
      });

      describe('with high start index', () => {
        test('removes nothing', (splice) => {
          splice(array, array.length + 1, 0);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, array.length + 1, 0)).to.deep.equal([]);
        });
      });

      describe('with negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1, 0);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1, 0)).to.deep.equal([]);
        });
      });

      describe('with very negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1 - array.length, 0);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1 - array.length, 0)).to.deep.equal([]);
        });
      });

      describe('with odd start index', () => {
        test('removes nothing', (splice) => {
          splice(array, null, 0);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, null, 0)).to.deep.equal([]);
        });
      });
    });

    describe('with high delete count', () => {
      test('removes everything after start index', (splice) => {
        splice(array, 3, array.length);
        expect(array).to.deep.equal([1, 2, 3]);
      });

      test('returns removed elements', (splice) => {
        expect(splice(array, 3, array.length)).to.deep.equal([4, 5]);
      });

      describe('with 0 start index', () => {
        test('removes everything', (splice) => {
          splice(array, 0, array.length);
          expect(array).to.deep.equal([]);
        });

        test('returns everything', (splice) => {
          expect(splice(array, 0, array.length)).to.deep.equal([1, 2, 3, 4, 5]);
        });
      });

      describe('with high start index', () => {
        test('removes nothing', (splice) => {
          splice(array, array.length + 1, array.length);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, array.length + 1, array.length)).to.deep.equal([]);
        });
      });

      describe('with negative start index', () => {
        test('removes everything after count from end', (splice) => {
          splice(array, -1, array.length);
          expect(array).to.deep.equal([1, 2, 3, 4]);
        });

        test('returns removed elements', (splice) => {
          expect(splice(array, -1, array.length)).to.deep.equal([5]);
        });
      });

      describe('with very negative start index', () => {
        test('removes everything', (splice) => {
          splice(array, -1 - array.length, array.length);
          expect(array).to.deep.equal([]);
        });

        test('returns everything', (splice) => {
          expect(splice(array, -1 - array.length, array.length)).to.deep.equal([1, 2, 3, 4, 5]);
        });
      });

      describe('with odd start index', () => {
        test('removes everything', (splice) => {
          splice(array, null, array.length);
          expect(array).to.deep.equal([]);
        });

        test('returns everything', (splice) => {
          expect(splice(array, null, array.length)).to.deep.equal([1, 2, 3, 4, 5]);
        });
      });
    });

    describe('with negative delete count', () => {
      test('removes nothing', (splice) => {
        splice(array, 3, -1);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 3, -1)).to.deep.equal([]);
      });

      describe('with 0 start index', () => {
        test('removes nothing', (splice) => {
          splice(array, 0, -1);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, 0, -1)).to.deep.equal([]);
        });
      });

      describe('with high start index', () => {
        test('removes nothing', (splice) => {
          splice(array, array.length + 1, -1);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, array.length + 1, -1)).to.deep.equal([]);
        });
      });

      describe('with negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1, -1);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1, -1)).to.deep.equal([]);
        });
      });

      describe('with very negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1 - array.length, -1);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1 - array.length, -1)).to.deep.equal([]);
        });
      });

      describe('with odd start index', () => {
        test('removes nothing', (splice) => {
          splice(array, null, -1);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, null, -1)).to.deep.equal([]);
        });
      });
    });

    describe('with odd delete count', () => {
      test('removes nothing', (splice) => {
        splice(array, 3, null);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 3, null)).to.deep.equal([]);
      });

      describe('with 0 start index', () => {
        test('removes nothing', (splice) => {
          splice(array, 0, null);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, 0, null)).to.deep.equal([]);
        });
      });

      describe('with high start index', () => {
        test('removes nothing', (splice) => {
          splice(array, array.length + 1, null);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, array.length + 1, null)).to.deep.equal([]);
        });
      });

      describe('with negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1, null);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1, null)).to.deep.equal([]);
        });
      });

      describe('with very negative start index', () => {
        test('removes nothing', (splice) => {
          splice(array, -1 - array.length, null);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, -1 - array.length, null)).to.deep.equal([]);
        });
      });

      describe('with odd start index', () => {
        test('removes nothing', (splice) => {
          splice(array, null, null);
          expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });

        test('returns empty array', (splice) => {
          expect(splice(array, null, null)).to.deep.equal([]);
        });
      });
    });
  });

  describe('with insert array', () => {
    describe('with 0 insert count', () => {
      test('does not alter array', (splice) => {
        splice(array, 0, 0, []);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 0, 0, [])).to.deep.equal([]);
      });
    });

    describe('with small insert count', () => {
      test('inserts elements', (splice) => {
        splice(array, 0, 0, [6, 7]);
        expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 0, 0, [6, 7])).to.deep.equal([]);
      });
    });

    describe('with large insert count', () => {
      test('inserts elements', (splice) => {
        splice(array, 0, 0, [6, 7, 8, 9, 10]);
        expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 0, 0, [6, 7, 8, 9, 10])).to.deep.equal([]);
      });
    });

    describe('with very large insert count', () => {
      test('inserts elements', (splice) => {
        splice(array, 0, 0, [6, 7, 8, 9, 10, 11, 12]);
        expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
      });

      test('returns empty array', (splice) => {
        expect(splice(array, 0, 0, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
      });
    });

    describe('with 0 delete count', () => {
      describe('with high start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, array.length + 1, 0, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, 0, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, 0, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, 0, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, 0, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, 0, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, 0, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, 0, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -2, 0, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, 0, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, 0, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, 0, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, 0, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, 0, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, 0, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, 0, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with very negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -array.length - 1, 0, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, 0, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, 0, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, 0, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, 0, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, 0, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, 0, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, 0, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with odd start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, null, 0, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, 0, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, 0, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, 0, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, 0, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, 0, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, 0, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, 0, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });
    });

    describe('with high delete count', () => {
      describe('with high start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, array.length + 1, array.length, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, array.length, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, array.length, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, array.length, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, array.length, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, array.length, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, array.length, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, array.length, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with negative start index', () => {
        describe('with 0 insert count', () => {
          test('removes everything after count from end', (splice) => {
            splice(array, -2, array.length, []);
            expect(array).to.deep.equal([1, 2, 3]);
          });

          test('removed elements', (splice) => {
            expect(splice(array, -2, array.length, [])).to.deep.equal([4, 5]);
          });
        });

        describe('with small insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -3, array.length, [6, 7]);
            expect(array).to.deep.equal([1, 2, 6, 7]);
          });

          test('returns removed elements', (splice) => {
            expect(splice(array, -3, array.length, [6, 7])).to.deep.equal([3, 4, 5]);
          });
        });

        describe('with large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -2, array.length, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10]);
          });

          test('returns removed elements', (splice) => {
            expect(splice(array, -2, array.length, [6, 7, 8, 9, 10])).to.deep.equal([4, 5]);
          });
        });

        describe('with very large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -2, array.length, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns removed elements', (splice) => {
            expect(splice(array, -2, array.length, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([4, 5]);
          });
        });
      });

      describe('with very negative start index', () => {
        describe('with 0 insert count', () => {
          test('removes everything', (splice) => {
            splice(array, -array.length - 1, array.length, []);
            expect(array).to.deep.equal([]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, -array.length - 1, array.length, [])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with small insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -array.length - 1, array.length, [6, 7]);
            expect(array).to.deep.equal([6, 7]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, -array.length - 1, array.length, [6, 7])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -array.length - 1, array.length, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, -array.length - 1, array.length, [6, 7, 8, 9, 10])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with very large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, -array.length - 1, array.length, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, -array.length - 1, array.length, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });
      });

      describe('with odd start index', () => {
        describe('with 0 insert count', () => {
          test('removes everything', (splice) => {
            splice(array, null, array.length, []);
            expect(array).to.deep.equal([]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, null, array.length, [])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with small insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, null, array.length, [6, 7]);
            expect(array).to.deep.equal([6, 7]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, null, array.length, [6, 7])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, null, array.length, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, null, array.length, [6, 7, 8, 9, 10])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });

        describe('with very large insert count', () => {
          test('removes and inserts elements', (splice) => {
            splice(array, null, array.length, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns everything', (splice) => {
            expect(splice(array, null, array.length, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([1, 2, 3, 4, 5]);
          });
        });
      });
    });

    describe('with negative delete count', () => {
      describe('with high start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, array.length + 1, -1, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, -1, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, -1, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, -1, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, -1, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, -1, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, -1, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, -1, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -2, -1, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, -1, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, -1, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, -1, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, -1, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, -1, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, -1, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, -1, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with very negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -array.length - 1, -1, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, -1, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, -1, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, -1, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, -1, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, -1, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, -1, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, -1, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with odd start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, null, -1, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, -1, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, -1, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, -1, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, -1, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, -1, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, -1, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, -1, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });
    });

    describe('with odd delete count', () => {
      describe('with high start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, array.length + 1, null, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, null, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, null, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, null, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, null, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, null, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, array.length + 1, null, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, array.length + 1, null, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -2, null, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, null, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, null, [6, 7]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, null, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, null, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, null, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -2, null, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -2, null, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with very negative start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, -array.length - 1, null, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, null, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, null, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, null, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, null, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, null, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, -array.length - 1, null, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, -array.length - 1, null, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });

      describe('with odd start index', () => {
        describe('with 0 insert count', () => {
          test('does not alter array', (splice) => {
            splice(array, null, null, []);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, null, [])).to.deep.equal([]);
          });
        });

        describe('with small insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, null, [6, 7]);
            expect(array).to.deep.equal([6, 7, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, null, [6, 7])).to.deep.equal([]);
          });
        });

        describe('with large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, null, [6, 7, 8, 9, 10]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, null, [6, 7, 8, 9, 10])).to.deep.equal([]);
          });
        });

        describe('with very large insert count', () => {
          test('inserts elements', (splice) => {
            splice(array, null, null, [6, 7, 8, 9, 10, 11, 12]);
            expect(array).to.deep.equal([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
          });

          test('returns empty array', (splice) => {
            expect(splice(array, null, null, [6, 7, 8, 9, 10, 11, 12])).to.deep.equal([]);
          });
        });
      });
    });
  });
});
