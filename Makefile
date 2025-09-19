install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

test:
	npm run test:unit

e2e:
	npx cypress open

up:
	docker compose up --build

no-cache:
	docker compose build --no-cache

down:
	docker compose down

logs:
	docker compose logs -f

bash:
	docker compose exec vue-task-manager sh
