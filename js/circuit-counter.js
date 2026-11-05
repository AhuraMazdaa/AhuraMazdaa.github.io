(function () {
  var circuit = document.querySelector('.circuit-easter-egg');
  if (!circuit) return;

  var readout = circuit.querySelector('.circuit-easter-egg__readout');
  var status = circuit.querySelector('.circuit-easter-egg__status');
  var segments = Array.prototype.slice.call(circuit.querySelectorAll('.seg'));
  var digitSegments = {
    0: ['a', 'b', 'c', 'd', 'e', 'f'],
    1: ['b', 'c'],
    2: ['a', 'b', 'g', 'e', 'd'],
    3: ['a', 'b', 'g', 'c', 'd'],
    4: ['f', 'g', 'b', 'c'],
    5: ['a', 'f', 'g', 'c', 'd'],
    6: ['a', 'f', 'g', 'e', 'c', 'd'],
    7: ['a', 'b', 'c']
  };
  var value = 0;
  var launchTimer;

  function render() {
    segments.forEach(function (segment) {
      var name = segment.className.match(/seg-([a-g])/)[1];
      segment.classList.toggle('on', digitSegments[value].indexOf(name) !== -1);
    });
    readout.textContent = 'COUNT: ' + value;
    circuit.dataset.counter = String(value);
  }

  circuit.querySelector('[data-count-up]').addEventListener('click', function () {
    if (value === 7) {
      value = 0;
      circuit.classList.add('is-overflow', 'is-launching');
      status.textContent = 'OVERFLOW! · ROCKET LAUNCH';
      window.clearTimeout(launchTimer);
      launchTimer = window.setTimeout(function () {
        circuit.classList.remove('is-overflow', 'is-launching');
        status.textContent = 'LED: READY · RANGE 0–7';
      }, 2200);
    } else {
      value += 1;
      circuit.classList.remove('is-overflow');
      status.textContent = 'LED: READY · RANGE 0–7';
    }
    render();
  });

  circuit.querySelector('[data-count-down]').addEventListener('click', function () {
    value = value === 0 ? 7 : value - 1;
    circuit.classList.remove('is-overflow', 'is-launching');
    window.clearTimeout(launchTimer);
    status.textContent = 'LED: READY · RANGE 0–7';
    render();
  });

  render();
}());
