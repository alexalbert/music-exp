export class App {
  configureRouter(config, router) {
    config.title = 'Music experiments';
    config.map([
      { route: ['', 'piano'], name: 'piano',      moduleId: 'keyboard',      nav: true, title: 'Piano' },
      { route: ['chords'], name: 'chords',      moduleId: 'chords',      nav: true, title: 'Chords' },
      { route: ['keys'], name: 'keys',      moduleId: 'keys',      nav: true, title: 'Keys' },
    ]);

    this.router = router;
  }
}
