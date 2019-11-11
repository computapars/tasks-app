function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', (done) => {
   setTimeout(() => {
    expect(sum(1, 2)).toBe(4); 
    done();
   }, 2000)
});