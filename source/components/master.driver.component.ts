import DefaultPage from "../classes/default-page";

export default class MasterDriverComponent extends DefaultPage {
  private view;
  private dataSorted;

  constructor(private backendService, private $filter, SweetAlert) {
    super(
      {},
      {id: null, name: null},
      {},
      {SweetAlert: SweetAlert}
    );
  }

  $onInit() {
    this.reset();
    this.changeView("read");
    this.loadData();
  }

  back() {
    this.reset();
    this.changeView('read');
  }

  submitForm() {
    let _this = this;
    if (!this.validateForm()) return;

    this.confirmSave(function (resp) {
      _this.loading = true;
      _this.backendService.saveDriver(_this.param, function () {
        _this.reset();
        _this.loadData();
        _this.changeView('read');
      }, function () {
        _this.errorMsg("Error", "Gagal menyimpan data");
      });
    });
  }

  toggleRecord(item) {
    let _this = this;
    _this.loading = true;
    _this.backendService.toggleDriver(item, function () {
      _this.loadData();
    }, function () {
      _this.errorMsg("Error", "Gagal menyimpan data");
    });
  }

  updateRecord(item) {
    this.changeView('create');
    this.selected = angular.copy(item);
    this.param = angular.copy(this.selected);
  }

  removeRecord(item) {
    let _this = this;
    this.confirmRemove(function () {
      _this.backendService.removeDriver(item, function () {
        _this.reset();
        _this.loadData();
        _this.changeView('read');
      });
    });
  }

  changeView(view) {
    this.view = view;
  }

  sort() {
    super.sort();
    this.dataSorted = this.sortData(this.$filter, 'name');
  }

  private loadData() {
    let _this = this;
    this.loading = true;
    this.backendService.getDrivers(function (resp) {
      _this.data = resp.data.data;
      _this.dataSorted = _this.sortData(_this.$filter, 'name');
      _this.loading = false;
    })
  }

  private validateForm() {
    this.resetError();
    if (this.param.name == null || this.param.name == "") this.addError('name', 'Nama supir tidak boleh kosong');
    return !this.isError();
  }

  static Factory() {
    return {
      controller: MasterDriverComponent,
      templateUrl: 'views/components/master.driver.html'
    };
  }
}

MasterDriverComponent.$inject = ['backendService', '$filter', 'SweetAlert'];
