@if ($paginator->hasPages())

    <div class="row">
        <div class="col-4 mr-5"></div>
        <div class="col text-center">
            <ul class="pagination pagination-lg">
                @if ($paginator->onFirstPage())

                    <li class="page-item disabled">
                        <a class="page-link" href="#">&laquo;</a>
                    </li>

                @else

                    <li class="page-item">
                        <a class="page-link" href="{{ $paginator->previousPageUrl() }}">&laquo;</a>
                    </li>

                @endif

                @foreach ($elements as $element)
                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())

                                <li class="page-item active">
                                    <a class="page-link" href="#">{{ $page }}</a>
                                </li>

                            @else

                                <li class="page-item">
                                    <a class="page-link" href="{{ $url }}">{{ $page }}</a>
                                </li>

                            @endif
                        @endforeach
                    @endif
                @endforeach
                @if ($paginator->hasMorePages())

                    <li class="page-item">
                        <a class="page-link" href="{{ $paginator->nextPageUrl() }}">&raquo;</a>
                    </li>

                @else

                    <li class="page-item disabled">
                        <a class="page-link" href="#">&raquo;</a>
                    </li>

                @endif
            </ul>
        </div>
        <div class="col-4"></div>
    </div>


@endif