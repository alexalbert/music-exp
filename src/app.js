export class App {
  configureRouter(config, router) {
    config.title = 'Music experiments';
    config.map([
      { route: ['', 'chords'], name: 'chords',      moduleId: 'chords',      nav: true, title: 'Chords' },
    ]);

    this.router = router;
  }
}
