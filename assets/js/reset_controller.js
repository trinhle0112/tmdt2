(() => {
  const application = Stimulus.Application.start();

  application.register(
    'reset',
    class extends Stimulus.Controller {
      reset() {
        alert('Do you want to reset this form?');
        location.reload();
      }
    }
  );
})();
