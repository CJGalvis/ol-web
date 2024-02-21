import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects/projects.service';

export interface PeriodicElement {
  id: number;
  project_name: string;
  repo_url: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontend_tecnology: string;
  backend_tecnology: string;
  databases: string;
  errors_count: number;
  warning_count: number;
  deploy_count: number;
  percentage_completion: number;
  report_nc: number;
  status: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  displayedColumns: string[] = [
    'project_name',
    'client',
    'repo_url',
    'developers',
    'ci',
    'cd',
    'frontend_tecnology',
    'backend_tecnology',
    'warning_count',
    'errors_count',
    'deploy_count',
    'percentage_completion',
    'report_nc',
    'status',
  ];
  dataSource = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataProjects();
  }

  getDataProjects() {
    this.subscriptions.add(
      this.projectsService.getProjects().subscribe((data: any) => {
        this.dataSource = data;
      })
    );
  }
}
