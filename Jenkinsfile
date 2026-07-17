pipeline {
	agent any

	tools {
		nodejs 'NodeJS 24.18.0'
	}

	options {
		disableConcurrentBuilds()
	}

	parameters {
		booleanParam(
			name: 'DEPLOY',
			defaultValue: false,
			description: '构建成功后是否部署文档站。首次构建请保持关闭，确认 Nginx 配置后再开启。',
		)
	}

	environment {
		APP_NAME = 'vue3-ui'
		DEPLOY_DIR = '/srv/vue3-ui'
		DOCS_DIST_DIR = 'docs/.vitepress/dist'
	}

	stages {
		stage('Verify toolchain') {
			steps {
				sh '''
					set -eu
					node --version
					pnpm --version
				'''
			}
		}

		stage('Install dependencies') {
			steps {
				sh 'pnpm install --frozen-lockfile'
			}
		}

		stage('Build docs') {
			steps {
				sh '''
					set -eu
					pnpm build:docs
					test -f "$DOCS_DIST_DIR/index.html"
				'''
			}
		}

		stage('Deploy docs') {
			when {
				expression { params.DEPLOY }
			}
			steps {
				sh '''
					set -eu
					sudo install -d -m 755 "$DEPLOY_DIR"
					sudo rsync -a --delete "$WORKSPACE/$DOCS_DIST_DIR/" "$DEPLOY_DIR/"
				'''
			}
		}
	}

	post {
		success {
			echo "${env.APP_NAME}: pipeline succeeded"
		}
		failure {
			echo "${env.APP_NAME}: pipeline failed"
		}
	}
}
